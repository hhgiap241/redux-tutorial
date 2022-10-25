import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: true
    },
    reducers: {
        login(state){
            state.isLoggedIn = true; // we can mutate state directly because we are using Immer
        },
        logout(state){
            state.isLoggedIn = false;
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice;