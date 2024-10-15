import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Menu } from "lucide-react-native";
import { useLocationStore } from "../../store/locationStore";

// Coordenadas de San Sebastián
const SAN_SEBASTIAN_COORDINATES = {
  latitude: 43.321,
  longitude: -1.9856,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const INITIAL_REGION = {
  latitude: 40.4168, // Latitud de Madrid
  longitude: -3.7038, // Longitud de Madrid
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CustomMarker = ({ price, onPress, coordinate }) => (
  <Marker coordinate={coordinate} onPress={onPress}>
    <View className="bg-white rounded-full p-2 items-center justify-center shadow-md">
      <Text className="font-bold text-base">{price} €</Text>
    </View>
  </Marker>
);

export default function MapScreen() {
  const { location } = useLocationStore();

  const handleMarkerPress = () => {
    Alert.alert("Marcador presionado", "Has presionado el marcador de precio.");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="absolute top-0 left-0 right-0 z-10 p-4 pt-5">
        <View className=" mt-10 rounded-2xl shadow-md">
          <View className="flex-row items-center bg-white rounded-xl overflow-hidden">
            <View className="pl-3">
              <Search width={20} height={20} color="#6B7280" />
            </View>
            <TextInput
              placeholder="Donostia - San Sebas..."
              className="flex-1 py-3 px-2 bg-transparent text-gray-700 text-sm"
            />
            <TouchableOpacity className="pr-3">
              <Menu width={20} height={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : INITIAL_REGION
        }
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
            description="Esta es tu ubicación actual"
          />
        )}
        {/* Marcador fijo en San Sebastián */}
        <CustomMarker
          price={117}
          onPress={handleMarkerPress}
          coordinate={SAN_SEBASTIAN_COORDINATES}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
