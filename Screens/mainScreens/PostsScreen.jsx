import { createStackNavigator } from "@react-navigation/stack";
import {
  CommentsScreen,
  DefaultPostsScreen,
  MapScreen,
} from "../nestedScreens";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/selectors";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useEffect } from "react";
import { getPosts } from "../../services/database";
const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const user = useSelector(selectAuth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator initialRouteName="DefaultPosts">
      <NestedScreen.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomColor: "rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "RobotoMedium",
            fontSize: 17,
            marginRight: -16,
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerLeft: null,
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: "Мапа",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomColor: "rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "RobotoMedium",
            fontSize: 17,
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Коментарі",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
            borderBottomColor: "rgba(0, 0, 0, 0.30)",
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "RobotoMedium",
            fontSize: 17,
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};
