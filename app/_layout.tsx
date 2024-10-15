import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Replace this with your iPhone's IP
const API_URL = "http://192.168.1.55:3003"; // Example, use your real IP

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  },
  (error) => {
    console.log("Error Response:", JSON.stringify(error.response, null, 2));
    return Promise.reject(error);
  }
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuthStore();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    async function prepare() {
      await initializeAuth();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded, initializeAuth]);

  useEffect(() => {
    if (fontsLoaded && !user) {
      router.push("/(auth)/login");
    }
  }, [fontsLoaded, user, router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
