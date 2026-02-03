import axiosInstance from "./axios";

// Users API
export const syncUser = async (userData) => {
  const res = await axiosInstance.post("/users/sync", userData);
  return res.data;
};

// Products API
export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const getMyProducts = async () => {
  const res = await axiosInstance.get("/products/my");
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axiosInstance.post("/products", productData);
  return res.data;
};

export const updateProduct = async ({ id, ...productData }) => {
  const res = await axiosInstance.put(`/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

// Comments API
export const createComment = async ({ productId, content }) => {
  const res = await axiosInstance.post(`/comments/${productId}`, { content });
  return res.data;
};

export const deleteComment = async ({ commentId }) => {
  const res = await axiosInstance.delete(`/comments/${commentId}`);
  return res.data;
};
