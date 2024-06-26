import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const getUser = async (req, res) => {
  try {
    const user = res.locals.user;

    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error in getUser handler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const user = res.locals.user;
    const otherUsers = await User.find({ _id: { $ne: user._id } }).select("-password");
    res.status(200).json(otherUsers);
  } catch (error) {
    logger.error(`Error in getOtherUsers handler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersWithExistingConversations = async (req, res) => {
  try {
    const user = res.locals.user;

    const conversations = await Conversation.find({
      participants: { $in: [user._id] }
    })
    .populate({
      path: 'participants',
      match: { _id: { $ne: user._id } },
      select: '-password'
    });

    res.status(200).json(conversations);
  } catch (error) {
    logger.error(`Error in getUsersWithExistingConversations handler: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
