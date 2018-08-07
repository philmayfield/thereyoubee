import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../common/setAuthToken";
import {
  // IS_LOADING,
  // NOT_LOADING,
  // GET_ERRORS,
  // CLEAR_ERRORS,
  // GET_USERNAME,
  SET_CURRENT_USER
} from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";

// login a user
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("loginUser"));

  axios
    .post("/api/user/login", userData)
    .then(res => {
      // save token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // set token to auth header for axios call
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user with decoded data
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("loginUser")));
};

// set currently logged in user
export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload
  };
};

// log out current user
export const logoutUser = () => dispatch => {
  dispatch(clearErrors());

  // remove jwt token from local storage
  localStorage.removeItem("jwtToken");

  // remove auth header for future axios calls
  setAuthToken(false);

  // set current user to empty object
  dispatch(setCurrentUser({}));
};
