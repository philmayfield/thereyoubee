import axios from "axios";
import {
  GET_PLACES,
  SET_CURRENT_PLACE,
  SAVE_CURRENT_PLACE
} from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";

// get all of the saved places
export const getAllPlaces = () => dispatch => {
  dispatch(isLoading("getAllPlaces"));

  axios
    .get("/api/place/all")
    .then(res => {
      dispatch({
        type: GET_PLACES,
        payload: res.data
      });
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("getAllPlaces")));
};

// save the current place to the server
export const saveCurrentPlace = place => dispatch => {
  dispatch(isLoading("saveCurrentPlace"));
  dispatch(clearErrors());

  axios
    .post("/api/place/", place)
    .then(payload => {
      dispatch({
        payload,
        type: SAVE_CURRENT_PLACE
      });
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("saveCurrentPlace")));
};

// set the current place on the app
export const setCurrentPlace = payload => {
  return {
    payload,
    type: SET_CURRENT_PLACE
  };
};
