import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";
export const LoginScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecurity, setPasswordSecurity] = useState(true);
  const isKeyboardShown = useKeyboardVisible();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onHideKeyboard = () => {
    Keyboard.dismiss();
  };
  const onLogin = () => {
    console.log(
      "Login дані",
      `Електронна пошта: ${email}
      Пароль: ${password}`
    );
    dispatch(authSignInUser(email, password));
    // navigation.navigate("Home");
  };
  return (
    <TouchableWithoutFeedback onPress={onHideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg-photo.jpg")}
          style={styles.backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.avoidContainer}
          >
            <View
              style={{
                ...styles.loginForm,
                marginBottom: isKeyboardShown ? -245 : 0,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.inputsWrapper}>
                <TextInput
                  style={email ? styles.inputActive : styles.input}
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  inputMode="email"
                />
                <View style={styles.passwordInputWrapper}>
                  <TextInput
                    style={password ? styles.inputActive : styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={passwordSecurity}
                  />
                  <Pressable
                    style={styles.passwordShowButton}
                    onPressIn={() => setPasswordSecurity(false)}
                    onPressOut={() => setPasswordSecurity(true)}
                  >
                    <Text style={styles.passwordShowButtonText}>Показати</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.buttonsWrapper}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  activeOpacity={0.8}
                  onPress={onLogin}
                >
                  <Text style={styles.primaryButtonText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("Registration");
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Немає акаунту?</Text>
                  <Text
                    style={{
                      ...styles.secondaryButtonText,
                      textDecorationLine: "underline",
                    }}
                  >
                    Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    fontFamily: "Roboto",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  avoidContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loginForm: {
    paddingTop: 32,
    paddingBottom: 144,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#212121",
    fontSize: 30,
    letterSpacing: 0.3,
    fontFamily: "RobotoMedium",
    marginBottom: 33,
  },
  inputsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    rowGap: 16,
    marginBottom: 43,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingTop: 15,
    paddingBottom: 14,
    fontSize: 16,
  },
  inputActive: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 6,
    width: "100%",
    backgroundColor: "#FFF",
    color: "#212121",
    paddingLeft: 16,
    paddingRight: 90,
    paddingTop: 15,
    paddingBottom: 14,
    fontSize: 16,
  },
  passwordInputWrapper: {
    width: "100%",
    position: "relative",
  },
  passwordShowButton: {
    position: "absolute",
    right: 15,
    top: 2,
    paddingTop: 18,
    paddingBottom: 15,
  },

  passwordShowButtonText: {
    color: "#1B4371",
    fontSize: 16,
  },
  buttonsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    rowGap: 16,
  },
  primaryButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  secondaryButton: { display: "flex", flexDirection: "row" },

  secondaryButtonText: {
    color: "#1B4371",
    fontSize: 16,
  },
});
