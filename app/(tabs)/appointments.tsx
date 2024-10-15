import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const AppointmentCard = ({
  shop,
  services,
  date,
  time,
  total,
  status,
  imageUrl,
}) => (
  <View className="bg-white rounded-2xl shadow-md p-4 mb-4">
    <View className="flex-row justify-between items-start mb-2">
      <View>
        <Text className="font-bold text-xl text-gray-800">{shop}</Text>
        <Text className="text-gray-500 mt-1">{services.join(" • ")}</Text>
      </View>
      <View
        className={`px-3 py-1 rounded-full ${
          status === "Completed" ? "bg-green-100" : "bg-yellow-100"
        }`}
      >
        <Text
          className={`text-xs font-medium ${
            status === "Completed" ? "text-green-800" : "text-yellow-800"
          }`}
        >
          {status}
        </Text>
      </View>
    </View>
    <View className="flex-row justify-between items-center mt-3 mb-4">
      <View className="flex-row items-center">
        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
        <Text className="text-sm text-gray-600 ml-2">{date}</Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons name="time-outline" size={16} color="#6B7280" />
        <Text className="text-sm text-gray-600 ml-2">{time}</Text>
      </View>
    </View>
    <Text className="font-bold text-xl text-gray-800 mb-4">
      Total: ${total}
    </Text>
    <View className="flex-row gap-3">
      <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded-lg">
        <Text className="text-white text-center font-semibold">Book Again</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 bg-gray-200 py-3 rounded-lg">
        <Text className="text-gray-800 text-center font-semibold">
          Write Review
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function AppointmentsScreen() {
  const appointments = [
    {
      shop: "Tigre Barbershop",
      services: ["Corte Regular", "Arreglo Barba"],
      date: "22/02/2025",
      time: "16:45",
      total: 29,
      status: "Completed",
      imageUrl: "/placeholder.svg?height=48&width=48",
    },
    {
      shop: "Salon Elegance",
      services: ["Tinte de Cabello", "Peinado"],
      date: "25/02/2025",
      time: "14:30",
      total: 75,
      status: "Upcoming",
      imageUrl: "/placeholder.svg?height=48&width=48",
    },
    {
      shop: "Spa Relax",
      services: ["Masaje Relajante", "Facial Rejuvenecedor"],
      date: "01/03/2025",
      time: "10:00",
      total: 120,
      status: "Upcoming",
      imageUrl: "/placeholder.svg?height=48&width=48",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4 pt-6 pb-24">
        <Text className="text-3xl font-bold mb-6 text-gray-800">
          Appointment History
        </Text>
        {appointments.map((appointment, index) => (
          <AppointmentCard key={index} {...appointment} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
