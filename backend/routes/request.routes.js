import express from "express";
import {
  cancelRequestHandler,
  getReceivedRequests,
  getSentRequests,
  sendRequestHandler,
  updateRequestHandler
} from "../controllers/request.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/send/:receiverId', protectRoute, sendRequestHandler);
router.get('/sent', protectRoute, getSentRequests);
router.get('/received', protectRoute, getReceivedRequests);
router.patch('/update/:id', protectRoute, updateRequestHandler);
router.delete('/cancel/:id', protectRoute, cancelRequestHandler);

export default router;
