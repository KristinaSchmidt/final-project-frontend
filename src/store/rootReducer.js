import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "user", "isLoggedIn"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  users: usersReducer,
});

export default rootReducer;