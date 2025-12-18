import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../shared/api/auth-api";
import instance from "../../shared/api/instance";
import { logout as logoutAction } from "./authSlice";
import { clearToken } from "../../shared/api/auth-api";


export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.register(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload);
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  }
);


export const logoutUser = () => async (dispatch) => {
  try {
    await instance.post("/auth/logout");
  } catch (e) {
  } finally {
    clearToken();
    dispatch(logoutAction());
    localStorage.removeItem("persist:auth");
  }
};


export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { getState, rejectWithValue }) => {
    const token = getState()?.auth?.accessToken;
    if (!token) return rejectWithValue("No token");

    try {
      return await authApi.getCurrent();
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
  
