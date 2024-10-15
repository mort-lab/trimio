import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useRouter, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/(tabs)"); // Redirigir al dashboard o pantalla principal
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        Alert.alert(
          "Login Failed",
          "Please verify your email before logging in."
        );
      } else {
        Alert.alert(
          "Login Failed",
          "An unexpected error occurred. Please try again."
        );
      }
      console.error("Login failed", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View className="bg-white p-8 rounded-3xl shadow-lg">
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-800">
                Welcome Back
              </Text>
              <Text className="text-gray-500 mt-2">Sign in to continue</Text>
            </View>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
              </View>
              <TouchableOpacity
                onPress={handleLogin}
                className="bg-blue-500 py-3 rounded-lg"
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
