import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getFriendsHandler, removeOneFriendHandler } from '../controllers/friend.controller.js'

const router = express.Router();

router.get('/', protectRoute, getFriendsHandler);
router.delete('/remove/:id', protectRoute, removeOneFriendHandler);

export default router;
