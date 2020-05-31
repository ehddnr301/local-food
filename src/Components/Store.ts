import { createStore } from "redux";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const loginUser = (userInfo) => {
  return {
    type: LOGIN,
    userInfo,
  };
};
export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

const userReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      const {
        userInfo: { data: id },
      } = action;

      return [{ isLoggedIn: true, userInfo: { id } }, ...state];
    case LOGOUT:
      return [{ isLoggedIn: false }];
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
