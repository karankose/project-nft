import { createSlice, current } from "@reduxjs/toolkit";
import { isLoggedIn } from "../pages/auth";

const slice = createSlice({
    name : "UserSlice",
    initialState:{
        currentUser  :{},
        isLoggedIn :false
    },
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser = action.payload;
            state.isLoggedIn=true;
        },
        signout : (state, action)=>{
            state.currentUser = {},
            state.isLoggedIn=false;
        }
    }
})

export const { setCurrentUser ,signout } = slice.actions;
export default slice.reducer; 