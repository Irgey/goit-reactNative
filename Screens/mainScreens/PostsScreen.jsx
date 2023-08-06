import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { PostCard } from "../../components/PostCard";

export const PostsScreen = () => {
  const route = useRoute();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    route.params && setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);
  console.log(posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PostCard
            photo={item.photo}
            title={item.title}
            location={item.userLocation}
            coords={item.coords}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    paddingTop: 32,
  },
});
