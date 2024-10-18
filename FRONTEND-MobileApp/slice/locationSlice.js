import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 0,
  long: 0,
};

export const locationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeLat: (state, action) => {
      console.log(action.payload);
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLat } = locationSlice.actions;

export default locationSlice.reducer;
