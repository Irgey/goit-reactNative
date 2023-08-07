import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  const {
    params: { coords },
  } = useRoute();
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ ...coords }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
});
