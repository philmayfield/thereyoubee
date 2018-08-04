import axios from "axios";
import { SET_CURRENT_PLACE, SAVE_CURRENT_PLACE } from "./actionTypes";
import {
  getErrors,
  // clearErrors,
  isLoading,
  notLoading
} from "./appActions";

export const setCurrentPlace = payload => {
  return {
    type: SET_CURRENT_PLACE,
    payload
  };
};

export const saveCurrentPlace = place => dispatch => {
  dispatch(isLoading("saveCurrentPlace"));

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
    .finally(() => dispatch(notLoading("makeBrew")));
};
