import express from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
  registerHandler
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', protectRoute, logoutHandler);

export default router;
