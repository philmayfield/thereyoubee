import { ADD_TOAST, DELETE_TOAST } from "./actionTypes";

// add a toast
export const addToast = payload => dispatch => {
  const time = payload.time || 3000;
  const id = Date.now();
  payload.id = id;

  dispatch({
    payload,
    type: ADD_TOAST
  });

  setTimeout(() => {
    dispatch(deleteToast(id));
  }, time);
};

// delete a toast
export const deleteToast = id => {
  return {
    payload: id,
    type: DELETE_TOAST
  };
};
