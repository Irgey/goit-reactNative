import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens/mainScreens/Home";
import { RegistrationScreen } from "./Screens/authScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/authScreens/LoginScreen";
import { MapScreen } from "./Screens/nestedScreens/MapScreen";
import { CommentsScreen } from "./Screens/nestedScreens/CommentsScreen";
import { useAppRoute } from "./router";
export default function App() {
  const routing = useAppRoute(true);
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return <NavigationContainer>{routing}</NavigationContainer>;
}
