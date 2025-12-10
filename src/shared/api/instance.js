import axios from "axios";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // ---- TOKEN EXPIRED → Refresh Token verwenden ----
    if (status === 401 && message === "accessToken expired") {
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      const { data } = await instance.post("/auth/refresh", { refreshToken });

      // ⭐ Token aktualisieren ⭐
      instance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;