import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getOtherUsers, getUser, getUsersWithExistingConversations } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/me', protectRoute, getUser);
router.get('/others', protectRoute, getOtherUsers);
router.get('/existing', protectRoute, getUsersWithExistingConversations);

export default router;
