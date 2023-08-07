import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Main } from "./components";
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
