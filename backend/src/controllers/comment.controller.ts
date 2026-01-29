import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Missing required field" });

    const newComment = await queries.createComment({ userId, productId, content });
    return res.status(201).json(newComment);
  } catch (error) {
    console.log("Error in createComment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { commentId } = req.params;
    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.userId !== userId) return res.status(403).json({ message: "You can only delete your own comments" });

    await queries.deleteComment(commentId);
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error in deleteComment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
