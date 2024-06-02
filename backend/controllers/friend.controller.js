import Friend from "../models/friend.model.js";
import logger from "../utils/logger.js";

export const getFriendsHandler = async (req, res) => {
  try {
    const user = res.locals.user;

    // return the whole user2 instead of id
    const friends = await Friend.find({ user1: user. _id });

    return res.status(200).json(friends);

  } catch (error) {
    logger.error(`Error in getFriendsHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeOneFriendHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = res.locals.user;

    const friend = await Friend.findOne({ user1: user._id, user2: id });

    if (!friend) {
      return res.status(404).json({ error: `Friend with id ${id} not found` });
    }

    // delete the friend
  } catch (error) {
    logger.error(`Error in removeOneFriendHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
