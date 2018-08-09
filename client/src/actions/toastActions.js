import { ADD_TOAST, DELETE_TOAST } from "./actionTypes";

// add a toast
export const addToast = payload => dispatch => {
  const { showClose = false, time = 3000 } = payload;
  const id = Date.now();
  payload.id = id;

  dispatch({
    payload,
    type: ADD_TOAST
  });

  if (!showClose) {
    // auto close
    setTimeout(() => {
      dispatch(deleteToast(id));
    }, time);
  }
};

// delete a toast
export const deleteToast = id => {
  return {
    payload: id,
    type: DELETE_TOAST
  };
};
