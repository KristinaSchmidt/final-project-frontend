import instance from "./instance";

export const createPost = async (formData) => {
  const { data } = await instance.post("/posts", formData);
  return data;
};

export const getPostById = async (postId) => {
  const { data } = await instance.get(`/posts/${postId}`);
  return data;
};

export const toggleLikePost = async (postId) => {
  if (!postId) throw new Error("toggleLikePost: postId is missing");
  const { data } = await instance.post(`/posts/${postId}/likes`);
  return data;
};

export const addCommentToPost = async (postId, text) => {
  if (!postId) throw new Error("addCommentToPost: postId is missing");
  const { data } = await instance.post(`/posts/${postId}/comments`, { text });
  return data?.comment ?? data;
};

export const getPostComments = async (postId) => {
  const { data } = await instance.get(`/posts/${postId}/comments`);
  const list = Array.isArray(data) ? data : data?.comments ?? [];
  return list.filter(Boolean);
};

export const updatePost = async (postId, payload) => {
  const { data } = await instance.patch(`/posts/${postId}`, payload);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await instance.delete(`/posts/${postId}`);
  return data;
};

export const getFeedPosts = async (page = 1, limit = 10) => {
  const { data } = await instance.get("/posts/feed", { params: { page, limit } });
  return data;
};


export const getPostsByUserId = async (userId) => {
  const { data } = await instance.get(`/posts/user/${userId}`);
  return data;
};