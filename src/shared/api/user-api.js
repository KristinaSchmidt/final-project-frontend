import instance from "./instance";

export const getUserProfile = async (id) => {
  const { data } = await instance.get(`/users/${id}`);
  return data;
};

export const getMyProfileApi = async () => {
  const { data } = await instance.get("/users/me");
  return data;
};