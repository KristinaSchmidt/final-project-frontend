import instance from "./instance";

export const getNotifications = async () => {
  const { data } = await instance.get("/notifications");
  return data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await instance.patch("/notifications/read-all");
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await instance.patch(`/notifications/${id}/read`);
  return data;
};