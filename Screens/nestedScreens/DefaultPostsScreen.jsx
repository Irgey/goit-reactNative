import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { PostCard } from "../../components";
import { getPosts } from "../../services/database";

export const DefaultPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    const data = await getPosts();
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <View style={styles.container}>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              postId={item.id}
              photo={item.photo}
              title={item.title}
              location={item.locality}
              coords={item.coords}
            />
          )}
        />
      )}
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
