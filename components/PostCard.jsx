import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getCommentsCount } from "../services/database";
import { useEffect, useState } from "react";
export const PostCard = ({ photo, title, location, coords, postId }) => {
  const navigation = useNavigation();
  const [commentsCount, setCommentsCount] = useState(0);
  const openMap = () => {
    navigation.navigate("Map", { coords });
  };
  const openComments = () => {
    navigation.navigate("Comments", { postId, photo });
  };
  const getComsCount = async () => {
    const count = await getCommentsCount(postId);
    setCommentsCount(count);
  };
  useEffect(() => {
    getComsCount();
  });
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardInfoWrapper}>
        <TouchableOpacity
          style={styles.commentsContainer}
          onPress={openComments}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.commentsCount}>{commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentsContainer} onPress={openMap}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.locationLink}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 32,
  },
  image: {
    width: 350,
    height: 240,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "RobotoMedium",
    color: "#212121",
  },
  cardInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  commentsCount: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  locationLink: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto",
    textDecorationLine: "underline",
  },
});
