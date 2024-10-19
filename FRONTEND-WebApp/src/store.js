// src/store.js
import { createStore } from "redux";

// Initial state
const initialState = {
  userId: null,
  isLoggedIn: false,
};

// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(authReducer);

export default store;
