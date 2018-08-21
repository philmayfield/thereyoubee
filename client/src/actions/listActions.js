import axios from "axios";
import {
  GET_LISTS,
  SET_LIST,
  SAVE_LIST,
  DELETE_LIST,
  RESET_LIST,
  RESET_LISTS,
  FLAG_LIST,
  UNFLAG_LIST
} from "./actionTypes";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { addToast } from "./toastActions";

// get all of the saved lists
export const getAllLists = () => dispatch => {
  dispatch(isLoading("getAllLists"));

  axios
    .get("/api/list/all")
    .then(res => {
      dispatch({
        type: GET_LISTS,
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
    .finally(() => dispatch(notLoading("getAllLists")));
};

// flag list to be removed
export const flagList = list => dispatch => {
  dispatch({
    type: FLAG_LIST,
    payload: list._id
  });

  dispatch(
    addToast({
      value: `Deleted ${list.name} list`,
      icon: "info",
      undoAction: unflagList,
      undoInaction: deleteList,
      undoObj: list,
      time: 5000
    })
  );
};

// unflag list to be removed
export const unflagList = list => dispatch => {
  dispatch({
    type: UNFLAG_LIST,
    payload: list._id
  });
};

// delete a list from the store and database
export const deleteList = list => dispatch => {
  axios
    .delete(`/api/list/${list._id}`)
    .then(() => {
      dispatch({
        type: DELETE_LIST,
        payload: list._id
      });
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    });
};

// save a new list to the database
export const saveList = list => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("saveCurrentList"));

  axios
    .post("/api/list/", list)
    .then(payload => {
      dispatch({
        payload,
        type: SAVE_LIST
      });
      dispatch(
        addToast({
          value: `Added ${list.name} list`,
          icon: "thumb_up"
        })
      );
      dispatch(setList(payload.data));
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("saveCurrentList")));
};

// set the current list on the app
export const setList = payload => {
  return {
    payload,
    type: SET_LIST
  };
};

// set the current list on the app
export const resetCurrentList = () => {
  return {
    type: RESET_LIST
  };
};

// set the current list on the app
export const resetLists = () => {
  return {
    type: RESET_LISTS
  };
};
