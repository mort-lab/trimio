import React from "react";
import { Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-5">
      <View className="w-full max-w-md">
        <Text className="text-2xl font-bold mb-4">
          Welcome, {user?.username}!
        </Text>
        <Text className="text-lg mb-2">Email: {user?.email}</Text>
        <Text className="text-lg mb-2">Phone: {user?.phone}</Text>
        <Text className="text-lg mb-4">Role: {user?.role}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}
