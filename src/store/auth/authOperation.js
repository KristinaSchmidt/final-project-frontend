import { createAsyncThunk} from "@reduxjs/toolkit";
import * as authApi from "../../shared/api/auth-api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload); 
      return data; 
    } catch (error) {

      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({
        message: error.message || "Register error",
      });
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload);
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  },
);

// GET CURRENT USER
export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getCurrent();
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  },
);