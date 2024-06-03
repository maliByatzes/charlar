import express from 'express';
import { getMessages, sendMessageHandler } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessageHandler);
router.get('/:id', protectRoute, getMessages);

export default router;
