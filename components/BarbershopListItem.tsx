import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import React from "react";
import barbershops from "../assets/data/barbershops.json"; // Cambiar fuente de datos

type BarbershopListItem = {
  barbershop: (typeof barbershops)[0];
  containerStyle?: ViewStyle;
};

const BarbershopListItem = ({
  barbershop,
  containerStyle,
}: BarbershopListItem) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {/* Imagen no está presente en algunos casos, por lo que se debe verificar */}
      {barbershop.barbershopImages.length > 0 ? (
        <Image
          source={{ uri: barbershop.barbershopImages[0] }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{barbershop.barbershopName}</Text>
        <Text style={styles.description}>
          {barbershop.barbershopAddress}, {barbershop.barbershopCity}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            Price: {barbershop.services[0].price.toFixed(2)}
          </Text>
          {/*  */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "gray",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontFamily: "InterBold",
    marginBottom: 10,
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});

export default BarbershopListItem;
