import React from "react";
import { LoginScreen, RegistrationScreen } from "./Screens/authScreens";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./Screens/mainScreens";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator(); // вказує на групу навігаторів

export const useAppRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        {/* Аналог Routes */}
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* Аналог Route */}
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <MainStack.Screen name="Map" component={MapScreen} />
      <MainStack.Screen name="Comments" component={CommentsScreen} /> */}
    </MainStack.Navigator>
  );
};
