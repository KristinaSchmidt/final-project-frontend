import {createSlice} from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authOperation";

const initialState={
    user:null,
    loading:false,
    error:null,
    accessToken:null,
    refreshToken:null,
    isRegisterSuccess:false,
    isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRegisterSuccess = false;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user || null;
        state.accessToken = payload.accessToken || null;
        state.refreshToken = payload.refreshToken || null;
        state.isRegisterSuccess = true;
        state.isLoggedIn = false;
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Register failed";
        state.isRegisterSuccess = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user || null;
        state.accessToken = payload.accessToken || null;
        state.refreshToken = payload.refreshToken || null;
        state.isLoggedIn = true;
      })

      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Login failed";
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;