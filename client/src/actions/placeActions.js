import axios from "axios";
import {
  GET_PLACES,
  FLAG_PLACE,
  UNFLAG_PLACE,
  SET_CURRENT_PLACE,
  SAVE_CURRENT_PLACE,
  RESET_CURRENT_PLACE,
  DELETE_PLACE,
  RESET_PLACES,
  FILTER_PLACES
} from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { addToast } from "./toastActions";

// get all of the saved places
export const getAllPlaces = (list_id = "all") => async dispatch => {
  dispatch(isLoading("getAllPlaces"));
  dispatch(resetPlaces());

  await axios
    .get(`/api/place/${list_id}`)
    .then(res => {
      dispatch({
        type: GET_PLACES,
        payload: res.data
      });
    })
    .catch(err => {
      const { response } = err;
      const error = response
        ? {
            status: response.status,
            data: response.data
          }
        : {
            status: "",
            data: err
          };

      dispatch(getErrors(error));

      if (response && response.status === 500) {
        dispatch(
          addToast({
            value: `Uh oh, thats a 500 response, try refreshing.`,
            icon: "error",
            showClose: true
          })
        );
      }
    })
    .finally(() => dispatch(notLoading("getAllPlaces")));
};

// flag place to be removed
export const flagPlace = place => dispatch => {
  dispatch({
    type: FLAG_PLACE,
    payload: place._id
  });

  dispatch(
    addToast({
      value: `Deleted ${place.suggestion}`,
      icon: "info",
      undoAction: unflagPlace,
      undoInaction: deletePlace,
      undoObj: place,
      time: 5000
    })
  );
};

// unflag place to be removed
export const unflagPlace = place => dispatch => {
  dispatch({
    type: UNFLAG_PLACE,
    payload: place._id
  });
};

// delete a place from the store and database
export const deletePlace = place => dispatch => {
  axios
    .delete(`/api/place/${place._id}`)
    .then(() => {
      dispatch({
        type: DELETE_PLACE,
        payload: place._id
      });
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    });
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
          icon: "thumb_up"
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

// reset the current place on the app to default
export const resetPlaces = () => {
  return {
    type: RESET_PLACES
  };
};

// filter places by list id
export const filterPlaces = payload => {
  // payload is a list id
  return {
    payload,
    type: FILTER_PLACES
  };
};
