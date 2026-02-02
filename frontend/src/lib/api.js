import axiosInstance from "./axios";

// USERS API
export const syncUser = async (data) => {
  return await axiosInstance.post("/users/sync", data);
};

// PRODUCTS API
export const getAllProducts = async () => {
  return await axiosInstance.get("/products");
};

export const getProductById = async (id) => {
  return await axiosInstance.get(`/products/${id}`);
};

export const getMyProducts = async () => {
  return await axiosInstance.get(`/products/my`);
};

export const createProduct = async (data) => {
  return await axiosInstance.post("/products", data);
};

export const updateProduct = async (id, data) => {
  return await axiosInstance.put(`/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await axiosInstance.delete(`/products/${id}`);
};

// COMMENTS API
export const createComment = async (productId, data) => {
  return await axiosInstance.post(`/comments/${productId}`, data);
};

export const deleteComment = async (id) => {
  return await axiosInstance.delete(`/comments/${id}`);
};
