import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const CustomMarker = ({ barbershop, onPress }) => {
  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: barbershop.barbershopLatitude,
        longitude: barbershop.barbershopLongitude,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontFamily: "InterBold" }}>
          {barbershop.services[0].price.toFixed(0)}€
        </Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
