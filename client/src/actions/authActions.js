import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../common/setAuthToken";
import { SET_CURRENT_USER } from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getAllPlaces, resetCurrentPlace, resetPlaces } from "./placeActions";
import { saveList } from "./listActions";
import { addToast } from "./toastActions";

// register a new user
export const registerUser = userData => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("registerUser"));

  async function logMeIn() {
    await loginUser(userData)(dispatch);
    dispatch(
      saveList({
        name: "default"
      })
    );
  }

  axios
    .post("/api/user/register", userData)
    .then(res => {
      // registered successfully, run login actions
      logMeIn(res.data);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("registerUser")));
};

// login a user
function loginUser(userData) {
  return async dispatch => {
    dispatch(clearErrors());
    dispatch(isLoading("loginUser"));

    await axios
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

        // go fetch the places for the user
        dispatch(getAllPlaces());

        // show a toast!
        dispatch(
          addToast({
            value: `Logged in as ${decoded.username}!`,
            icon: "mood"
          })
        );
      })
      .then(() => console.log("logged in"))
      .catch(err => {
        const error = err.response ? err.response.data : err;
        dispatch(getErrors(error));
      })
      .finally(() => dispatch(notLoading("loginUser")));
  };
}
export { loginUser };

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

  // reset current place and places
  dispatch(resetCurrentPlace());
  dispatch(resetPlaces());
};
