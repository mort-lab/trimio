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

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await register(email, username, password, phone);
      Alert.alert(
        "Registration Successful",
        "Please check your email to verify your account before logging in."
      );
      router.push("/login"); // Redirigir a la pantalla de login
    } catch (error) {
      console.error("Signup failed", error);
      Alert.alert(
        "Signup Failed",
        "Please check your information and try again."
      );
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
              <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="person-add" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-800">
                Create Account
              </Text>
              <Text className="text-gray-500 mt-2">Sign up to get started</Text>
            </View>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Username</Text>
                <TextInput
                  placeholder="Choose a username"
                  value={username}
                  onChangeText={setUsername}
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                <TextInput
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                />
              </View>
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Phone</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  className="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity
                onPress={handleSignup}
                className="bg-green-500 py-3 rounded-lg"
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-6 flex-row justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text className="text-green-500 font-semibold">Login</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
