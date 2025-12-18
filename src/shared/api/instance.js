import axios from "axios";
import { setTokens } from "../../store/auth/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const normalizeApiBase = () => {
  const raw = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const cleaned = raw.replace(/\/$/, "");
  return cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
};

const instance = axios.create({
  baseURL: normalizeApiBase(),
});

const getAccessToken = () => {
  const fromStore = store?.getState?.()?.auth?.accessToken;
  if (fromStore) return fromStore;
  return localStorage.getItem("accessToken") || "";
};

const getRefreshToken = () => {
  const fromStore = store?.getState?.()?.auth?.refreshToken;
  if (fromStore) return fromStore;
  return localStorage.getItem("refreshToken") || "";
};


instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    const isExpired =
      status === 401 &&
      (message === "accessToken expired" || message === "jwt expired");

    if (isExpired && store && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) return Promise.reject(error);

      try {
        const { data } = await instance.post("/auth/refresh", { refreshToken });

        store.dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;