import React, { useEffect } from "react";
import { Text, Button, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { useLocationStore } from "../../store/locationStore";
import LocationPermissionRequest from "../../components/LocationPermissionRequest";
import NearbyBarbershops from "../../components/NearbyBarbershops";
import * as Location from "expo-location";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { location, setLocation } = useLocationStore();

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      getLocation();
    }
  };

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
      console.log(user.email);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-5">
        <View className="w-full">
          <Text className="text-2xl font-bold mb-4">
            Welcome, {user?.username}!
          </Text>
          <Text className="text-lg mb-2">Email: {user?.email}</Text>
          <Text className="text-lg mb-2">Phone: {user?.phone}</Text>
          <Text className="text-lg mb-4">Role: {user?.role}</Text>
          {location && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Your Location:</Text>
              <Text className="text-base">
                Latitude: {location.latitude.toFixed(6)}
              </Text>
              <Text className="text-base">
                Longitude: {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}
          {!location && (
            <LocationPermissionRequest onPermissionGranted={getLocation} />
          )}
          <Button title="Logout" onPress={handleLogout} />
        </View>

        <View className="mt-8">
          <Text className="text-xl font-bold mb-4">Nearby Barbershops</Text>
          <NearbyBarbershops />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
