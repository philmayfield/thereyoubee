import { ADD_TOAST, DELETE_TOAST } from "../actions/actionTypes";

export default (state = [], action) => {
  // if (action.type === ADD_TOAST) {
  //   console.log("add_toast", state, action);
  // }
  switch (action.type) {
    case ADD_TOAST:
      return [...state, action.payload];

    case DELETE_TOAST:
      return state.filter(toast => toast.id !== action.payload);

    default:
      return state;
  }
};
