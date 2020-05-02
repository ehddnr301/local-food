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
        userInfo: {
          data: { avatarUrl, email, username, _id: id },
        },
      } = action;

      return [
        { isLoggedIn: true, userInfo: { avatarUrl, email, username, id } },
        ...state,
      ];
    case LOGOUT:
      return state.filter((s) => s == 0);
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
