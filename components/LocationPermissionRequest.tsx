import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import * as Location from "expo-location";

interface LocationPermissionRequestProps {
  onPermissionGranted: () => void;
}

const LocationPermissionRequest: React.FC<LocationPermissionRequestProps> = ({
  onPermissionGranted,
}) => {
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      onPermissionGranted();
    } else {
      Alert.alert(
        "Permission denied",
        "Location permission is required to show your location on the map."
      );
    }
  };

  return (
    <TouchableOpacity
      className="bg-blue-500 px-5 py-2.5 rounded-full mb-4"
      onPress={requestLocationPermission}
    >
      <Text className="text-white font-bold">Allow Location Access</Text>
    </TouchableOpacity>
  );
};

export default LocationPermissionRequest;
