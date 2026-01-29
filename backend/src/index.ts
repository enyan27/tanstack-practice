import express from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env";
import { commentRoutes, productRoutes, userRoutes } from "./routes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(express.json()); // parse json req
app.use(express.urlencoded({ extended: true })); // parse form data (html forms)
app.use(clerkMiddleware()); // auth obj will be attached to the req

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/comments", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log(`🦔 Server is running on http://localhost:${ENV.PORT}`);
});
