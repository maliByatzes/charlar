import express from "express";
import { sendRequestHandler } from "../controllers/request.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/send/:receiverId', protectRoute, sendRequestHandler);

export default router;
