import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import adminSlice from './adminSlice';
import jobReducer from './jobSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    jobs: jobReducer,
  }
});

export default store;
