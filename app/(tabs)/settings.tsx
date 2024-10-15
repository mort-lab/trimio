import React, { useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBarbershopStore } from "../../store/barbershopStore";
import { useLocationStore } from "../../store/locationStore";

export default function SettingsScreen() {
  const { barbershops, isLoading, error, fetchNearbyBarbershops } =
    useBarbershopStore();
  const { location } = useLocationStore();

  useEffect(() => {
    if (location) {
      fetchNearbyBarbershops();
    }
  }, [location]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      <View className="p-5">
        <Text className="text-2xl font-bold">Nearby Barbershops</Text>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text className="text-red-500 mt-2">Error: {error}</Text>}
        {!isLoading && !error && (
          <FlatList
            data={barbershops}
            keyExtractor={(item) => item.barbershopId}
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-300">
                <Text className="text-lg font-semibold">
                  {item.barbershopName}
                </Text>
                <Text className="text-gray-600">{item.barbershopAddress}</Text>
                <Text className="text-gray-600">
                  {item.barbershopCity}, {item.barbershopState}
                </Text>
                <Text className="text-gray-600 mt-1">
                  Services:{" "}
                  {item.services.length > 0
                    ? item.services
                        .map((service) => service.serviceName)
                        .join(", ")
                    : "No services available"}
                </Text>
                <Text className="text-gray-600 mt-1">
                  Barber(s):{" "}
                  {item.barberProfiles.length > 0
                    ? item.barberProfiles
                        .map((profile) => profile.barberName || "Unknown")
                        .join(", ")
                    : "No barbers available"}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
