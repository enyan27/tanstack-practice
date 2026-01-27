import express from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env";

const app = express();
const { PORT, FRONTEND_URL } = ENV;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json()); // parse json req
app.use(express.urlencoded({ extended: true })); // parse form data (html forms)
app.use(clerkMiddleware()); // auth obj will be attached to the req

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`🦔 Server is running on http://localhost:${PORT}`);
});
