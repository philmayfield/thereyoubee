import { ADD_TOAST, DELETE_TOAST } from "./actionTypes";

// add a toast
export const addToast = payload => dispatch => {
  const id = Date.now();
  payload.id = id;

  dispatch({
    payload,
    type: ADD_TOAST
  });
};

// delete a toast
export const deleteToast = id => {
  return {
    payload: id,
    type: DELETE_TOAST
  };
};
