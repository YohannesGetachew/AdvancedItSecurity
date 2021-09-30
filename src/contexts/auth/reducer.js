import { ADD_AUTH_DATA, REMOVE_AUTH_DATA } from "./actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_AUTH_DATA:
      return action.payload;
    case REMOVE_AUTH_DATA:
      return null;
    default:
      return state;
  }
};
