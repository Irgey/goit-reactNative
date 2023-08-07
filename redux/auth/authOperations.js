import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;
export const authSignInUser =
  (email, password) => async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser =
  (email, password, login) => async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });
      const updateUserSuccess = await auth.currentUser;
      const userInfo = {
        userId: updateUserSuccess.uid,
        login: updateUserSuccess.displayName,
      };
      console.log("UserInfo", userInfo);
      dispatch(updateUserProfile(userInfo));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userInfo = {
        userId: user.uid,
        login: user.displayName,
      };
      dispatch(updateUserProfile(userInfo));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
