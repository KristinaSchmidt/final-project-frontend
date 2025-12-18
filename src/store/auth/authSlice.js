import {createSlice} from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser } from "./authOperation";


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
   reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isRegisterSuccess = false;
      state.isLoggedIn = false;
    },
    setTokens(state, { payload }) {
      state.accessToken = payload.accessToken || null;
      state.refreshToken = payload.refreshToken || null;
    },
    setUser(state, { payload }) {
      state.user = payload;
  },
  },
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
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
      })
  },
});

export const { logout, setTokens, setUser } = authSlice.actions;
export default authSlice.reducer;