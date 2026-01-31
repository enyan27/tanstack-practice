import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const result = await queries.getAllProducts();
    if (!result) return res.status(404).json({ message: "No products found" });
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in getAllProducts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const result = await queries.getProductByUserId(userId);
    if (!result) return res.status(404).json({ message: "No products found for this user" });
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMyProducts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await queries.getProductById(id);
    if (!result) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in getProductById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { title, description, imageUrl } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!title || !description || !imageUrl) return res.status(400).json({ message: "Missing required fields" });

    const result = await queries.createProduct({ userId, title, description, imageUrl });
    return res.status(201).json(result);
  } catch (error) {
    console.log("Error in createProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// owner only
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!title || !description || !imageUrl) return res.status(400).json({ message: "Missing required fields" });

    const result = await queries.updateProduct(id, userId, { title, description, imageUrl });
    if (!result) return res.status(404).json({ message: "Product not found or you are not the owner" });
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error in updateProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await queries.deleteProduct(id, userId);
    if (!result) return res.status(404).json({ message: "Product not found or you are not the owner" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
