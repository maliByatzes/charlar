import Conversation from "../models/conversation.model.js";
import Friend from "../models/friend.model.js";
import Message from "../models/message.model.js";
import logger from "../utils/logger.js";

export const sendMessageHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = res.locals.user._id.toString();

    if (senderId === receiverId) {
      return res.status(400).json({ error: "Cannot send message to yourself" });
    }

    const friend = await Friend.findOne({
      $or: [{ user1: senderId, user2: receiverId }, { user1: receiverId, user2: senderId }]
    });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);

  } catch (error) {
    logger.error(`Error in sendMessageHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = res.locals.user._id;

    const friend = await Friend.findOne({
      $or: [{ user1: senderId, user2: userToChatId }, { user1: userToChatId, user2: senderId }]
    });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);

  } catch (error) {
    logger.error(`Error in getMessages: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
