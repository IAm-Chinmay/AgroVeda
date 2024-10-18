import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  role: "",
  login: false,
};

export const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.login = action.payload.login;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userAuthSlice.actions;

export default userAuthSlice.reducer;
