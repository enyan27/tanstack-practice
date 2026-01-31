import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { productId } = req.params;
    const { content } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!content) return res.status(400).json({ message: "Missing required field" });

    const result = await queries.createComment({ userId, productId, content });
    return res.status(201).json(result);
  } catch (error) {
    console.log("Error in createComment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { commentId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await queries.deleteComment(commentId, userId);
    if (!result) return res.status(404).json({ message: "Comment not found or you are not the owner" });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error in deleteComment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
