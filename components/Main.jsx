import { NavigationContainer } from "@react-navigation/native";
import { useAppRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../redux/selectors";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { stateChange } = useSelector(selectAuth);
  const routing = useAppRoute(stateChange);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [authStateChangeUser]);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
