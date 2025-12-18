import instance from "./instance";

export const register = async payload => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async payload => {
  const { data } = await instance.post("/auth/login", payload);
  instance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

  return data;
};

export const setToken = (token) => {
  if (!token) return;
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export const logout = async () => {
  await instance.post("/auth/logout");
  clearToken();
};

export const getCurrent = async () => {
  const { data } = await instance.get("/auth/current");
  return data;
};