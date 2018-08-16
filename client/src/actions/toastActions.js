// Toast Payload Options
// {
//   value: -string (what shows on the toast),
//   icon: -string (optional, add an icon),
//   showClose: -bool (optional, show close button, will not auto delete),
//   time: -number in ms (optional, time to auto delete),
//   undoAction: -function (optional, callback if undo clicked),
//   undoInaction: -function (optional, callback if undo is not clicked),
//   undoObj: -object (optional, passed to undoAction and undoInaction as argument)
// }

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
