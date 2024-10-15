import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      <View className="p-5">
        <Text className="text-2xl font-bold">Settings Screen</Text>
        <Text className="mt-2">Your settings content goes here.</Text>
      </View>
    </SafeAreaView>
  );
}
