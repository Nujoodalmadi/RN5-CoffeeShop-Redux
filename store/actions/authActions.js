import * as actionTypes from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";

export const checkForExpiredToken = navigation => {
  return async dispatch => {
    // Get token
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      console.log((user.exp - currentTime) / 60);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
        navigation.replace("Profile");
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

//setCurrentUser
const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

//loginUser
export const loginUser = (userData, navigation) => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "http://coffee.q8fawazo.me/api/login/",
        userData
      );
      let user = response.data;
      let decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      navigation.navigate("CoffeeList");
    } catch (error) {
      console.error(error);
    }
  };
};

//registerUser
export const registerUser = (userData, navigation) => {
  return async dispatch => {
    try {
      await axios.post("http://coffee.q8fawazo.me/api/register/", userData);

      dispatch(loginUser(userData, navigation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logoutUser = navigation => {
  setAuthToken();
  navigation.navigate("Login");
  return setCurrentUser();
};

export const setError = errors => ({
  type: actionTypes.SET_ERROR,
  payload: errors
});
