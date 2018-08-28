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
export const getAllLists = () => async dispatch => {
  dispatch(isLoading("getAllLists"));

  await axios
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
export const saveList = ({ _id = "", name }) => dispatch => {
  const editing = _id ? true : false;

  dispatch(clearErrors());
  dispatch(isLoading("saveCurrentList"));

  axios
    .post(`/api/list/${_id}`, { name })
    .then(res => {
      dispatch(
        addToast({
          value: `${editing ? "Updated" : "Added"} ${name} list`,
          icon: "thumb_up"
        })
      );
      if (editing) {
        toggleAddForm(false); // toggle hiding the add form

        dispatch({
          payload: res.data,
          type: EDIT_LIST
        });
      } else {
        // componentDidUpdate handles closing the add form for a new list
        dispatch({
          payload: res.data,
          type: SAVE_LIST
        });
        dispatch(setList(res.data));
      }
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("saveCurrentList")));
};

// set the current list on the app
export const setList = payload => {
  // payload is list object
  // set the current list on local storage
  localStorage.setItem("currentList", payload._id || null);
  return {
    payload,
    type: SET_LIST
  };
};

// reset the current list on the app
export const resetCurrentList = () => {
  // set the current list on local storage
  localStorage.removeItem("currentList");
  return {
    type: RESET_LIST
  };
};

// reset all the lists on the app
export const resetLists = () => {
  return {
    type: RESET_LISTS
  };
};
