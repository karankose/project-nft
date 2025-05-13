import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: {},
    isLoggedIn: false
  },
  reducers: {
    setCurrentAdmin: (state, action) => {
      state.currentAdmin = action.payload;
      state.isLoggedIn = true;
    },
    signoutAdmin: (state) => {
      state.currentAdmin = {};
      state.isLoggedIn = false;
    }
  }
});

export const { setCurrentAdmin, signoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
