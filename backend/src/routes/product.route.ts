import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.get("/test", (_, res) => res.status(200).json({ message: "Product route is working!" }));

router.get("/", productController.getAllProducts);
router.get("/my", productController.getMyProducts);
router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
