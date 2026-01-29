import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const products = await queries.getProductByUserId(userId);
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error in getMyProducts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProductById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) return res.status(400).json({ message: "Missing required fields" });

    const newProduct = await queries.createProduct({ userId, title, description, imageUrl });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// owner only
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) return res.status(400).json({ message: "Missing required fields" });

    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.userId !== userId) return res.status(403).json({ message: "You can only update your own products" });

    const updatedProduct = await queries.updateProduct(id, { title, description, imageUrl });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error in updateProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.userId !== userId) return res.status(403).json({ message: "You can only delete your own products" });

    await queries.deleteProduct(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
