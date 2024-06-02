import User from "../models/user.model.js";
import { verifyToken } from "../utils/generateTokens.js";
import logger from "../utils/logger.js";

export const protectRoute = async (req, res, next) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return res.status(401).json({ error: "Unauthorized - No access token" });
    }

    const userId = await verifyToken(access_token);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid access token" });
    }

    const user = User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
