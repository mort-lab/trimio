import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Search, Menu, MapPin } from "lucide-react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomMarker from "@/components/CustomMarker";
import BarbershopListItem from "@/components/BarbershopListItem"; // Renombramos para mayor claridad
import barbershops from "@/assets/data/barbershops.json"; // Cambiamos la fuente de datos
import { useLocationStore } from "@/store/locationStore";
import * as Location from "expo-location";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MapScreen() {
  const [selectedBarbershop, setSelectedBarbershop] = useState(null);
  const { location, setLocation } = useLocationStore();
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      getLocation();
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        getLocation();
      }
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

  const handleMarkerPress = useCallback((barbershop) => {
    setSelectedBarbershop(barbershop);
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 40.4168,
        longitude: -3.7038,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {barbershops.map((barbershop) => (
            <CustomMarker
              key={barbershop.barbershopId}
              barbershop={barbershop}
              onPress={() => handleMarkerPress(barbershop)}
            />
          ))}
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
            >
              <MapPin width={24} height={24} color="#007AFF" />
            </Marker>
          )}
        </MapView>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchContainer}>
            <Search width={20} height={20} color="#6B7280" />
            <TextInput
              placeholder="Buscar ubicación"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Menu width={20} height={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.bottomSheetIndicator}
          backgroundStyle={styles.bottomSheetBackground}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>
              {selectedBarbershop
                ? "Barbería Seleccionada"
                : `${barbershops.length} barberías disponibles`}
            </Text>
            <BottomSheetFlatList
              data={selectedBarbershop ? [selectedBarbershop] : barbershops}
              keyExtractor={(item) => item.barbershopId}
              renderItem={({ item }) => (
                <BarbershopListItem
                  barbershop={item}
                  containerStyle={styles.listItemContainer}
                />
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    height: SCREEN_HEIGHT,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Jakarta",
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "Jakarta-Bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItemContainer: {
    marginBottom: 16,
  },
  bottomSheetIndicator: {
    backgroundColor: "#D1D5DB",
    width: 40,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
