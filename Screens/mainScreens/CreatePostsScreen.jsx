import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      let { status: geolocationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (geolocationStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const { coords } = await Location.getCurrentPositionAsync();
      setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };
  const sendPhoto = () => {
    if (photo) {
      navigation.navigate("DefaultPosts", {
        photo,
        title,
        userLocation,
        coords,
      });
      setPhoto(null);
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.cameraPlaceholder} />
        ) : hasPermission ? (
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <View style={styles.photoView}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <View style={styles.takePhotoOut}>
                    <FontAwesome5 name="camera" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <TouchableOpacity>
              <Image source={require("../../assets/images/camera.png")} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.downloadPhotoButton}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.locationContainer}>
          <Image
            style={styles.locationIcon}
            source={require("../../assets/icons/map-pin.png")}
          />
          <TextInput
            style={styles.locationInput}
            placeholder="Місцевість..."
            value={userLocation}
            onChangeText={setUserLocation}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.publishButton,
            backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPhoto}
        >
          <Text
            style={{
              ...styles.publishButtonText,
              color: photo ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFF",
  },
  cameraContainer: {
    height: "37.5%",
    overflow: "hidden",
    borderRadius: 6,
  },
  camera: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPlaceholder: {
    height: "37.5%",
    borderRadius: 6,
    backgroundColor: "#E8E8E8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadPhotoButton: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  locationContainer: {
    position: "relative",
    marginBottom: 32,
  },
  locationIcon: {
    position: "absolute",
    bottom: 13,
  },
  locationInput: {
    paddingLeft: 28,
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "flex-end" },

  takePhotoOut: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  publishButton: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 51,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  publishButtonText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
