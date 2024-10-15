import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocationStore } from "../store/locationStore";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const API_URL = "http://192.168.1.35:3003"; // Make sure this matches your actual IP and port

interface Barbershop {
  barbershopId: string;
  barbershopName: string;
  barbershopAddress: string;
  barbershopCity: string;
  barbershopState: string;
  barbershopZipCode: string;
  barbershopLatitude: number;
  barbershopLongitude: number;
  services: any[];
  barberProfiles: any[];
}

export default function NearbyBarbershops() {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useLocationStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    fetchBarbershops();
  }, [location, accessToken]);

  const fetchBarbershops = async () => {
    if (!location) {
      setError("Location not available. Please enable location services.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/barbershops/nearby`, {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          radiusKm: 10, // Default radius set to 10km
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setBarbershops(response.data);
    } catch (error) {
      console.error("Error fetching nearby barbershops:", error);
      setError("Failed to fetch nearby barbershops. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderBarbershop = ({ item }: { item: Barbershop }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow">
      <Text className="text-lg font-bold">{item.barbershopName}</Text>
      <Text className="text-sm text-gray-600">
        {item.barbershopAddress}, {item.barbershopCity}
      </Text>
      <Text className="text-sm text-gray-600">
        {item.barbershopState}, {item.barbershopZipCode}
      </Text>
      <Text className="text-sm mt-2">Services: {item.services.length}</Text>
      <Text className="text-sm">Barbers: {item.barberProfiles.length}</Text>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <FlatList
        data={barbershops}
        renderItem={renderBarbershop}
        keyExtractor={(item) => item.barbershopId}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            No barbershops found nearby.
          </Text>
        }
      />
    </View>
  );
}
