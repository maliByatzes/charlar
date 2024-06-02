import User from "../models/user.model";
import logger from "../utils/logger";

export const getUser = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).json(user);
  } catch (error) {
    logger.error("Error in getUser handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const user = res.locals.user;

    const otherUsers = await User.findById({ _id: { $ne: user._id } }).select("password");

    res.status(200).json(otherUsers);
  } catch (error) {
    logger.error("Error in getOtherUsers handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
