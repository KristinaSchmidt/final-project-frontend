import instance from "./instance";

export const getUserProfile = async (id) => {
  const { data } = await instance.get(`/users/${id}`);
  return data;
};

export const getMyProfile = async () => {
  const { data } = await instance.get("/users/me");
  return data;
};


export const toggleFollow = async (id) => {
  const { data } = await instance.post(`/users/${id}/follow`);
  return data;
};