import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/comment.controller";

const router = Router();

router.post("/:productId", commentController.createComment);
router.delete("/:commentId", commentController.deleteComment);

export default router;
