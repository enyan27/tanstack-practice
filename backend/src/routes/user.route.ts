import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.post("/sync", requireAuth(), userController.syncUser);

export default router;
