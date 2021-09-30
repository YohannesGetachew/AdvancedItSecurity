import { ADD_AUTH_DATA, REMOVE_AUTH_DATA } from "./actionTypes";

export const addAuthData = (authData = null) => {
  return {
    type: ADD_AUTH_DATA,
    payload: authData,
  };
};

export const removeAuthData = () => {
  return {
    type: REMOVE_AUTH_DATA,
  };
};
