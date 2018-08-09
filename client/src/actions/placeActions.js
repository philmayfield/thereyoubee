import axios from "axios";
import {
  GET_PLACES,
  SET_CURRENT_PLACE,
  SAVE_CURRENT_PLACE,
  RESET_CURRENT_PLACE,
  DELETE_PLACE
} from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { addToast } from "./toastActions";

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

// delete a place from the database
export const deletePlace = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("deletePlace"));

  axios
    .delete(`/api/place/${id}`)
    .then(res => {
      const { place } = res.data;
      dispatch({
        type: DELETE_PLACE,
        payload: id
      });
      dispatch(
        addToast({
          value: `Deleted ${place.suggestion}`,
          icon: "info",
          time: 3000
        })
      );
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("deletePlace")));
};

// save the current place to the database
export const saveCurrentPlace = place => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("saveCurrentPlace"));

  axios
    .post("/api/place/", place)
    .then(payload => {
      dispatch({
        payload,
        type: SAVE_CURRENT_PLACE
      });
      dispatch(
        addToast({
          value: `Added ${place.suggestion}`,
          icon: "thumb_up",
          time: 3000
        })
      );
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

// reset the current place on the app to default
export const resetCurrentPlace = () => {
  return {
    type: RESET_CURRENT_PLACE
  };
};
