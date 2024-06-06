import logger from "../utils/logger.js";
import Request from '../models/request.model.js';
import Friend from "../models/friend.model.js";

export const sendRequestHandler = async (req, res) => {
  try {

    const { receiverId } = req.params;
    const user = res.locals.user;

    if (user._id === receiverId) {
      return res.status(401).json({ error: "Cannot send request to yourself" });
    }

    const existingRequest = await Request.findOne({
      $or: [
        { senderId: user._id, receiverId },
        { senderId: receiverId, receiverId: user._id }
      ]
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: "Request already exists" });
    }

    const existingFriend = await Friend.findOne({
      $or: [
        { user1: user._id, user2: receiverId },
        { user1: receiverId, user2: user._id }
      ]
    });

    if (existingFriend) {
      return res.status(400).json({ error: "You are already friends with this user" });
    }

    const newRequest = new Request({
      senderId: user._id,
      receiverId
    });

    if (newRequest) {
      await newRequest.save();
      return res.status(200).json(newRequest);
    } else {
      return res.status(400).json({ error: "Invalid request data" });
    }
  } catch (error) {
    logger.error(`Error in sendRequestHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSentRequests = async (req, res) => {
  // TODO: implement pagination
  try {

    const user = res.locals.user;

    const requests = await Request.find({ senderId: user._id, status: "pending" }).populate({
      path: "senderId",
      model: "User"
    });

    return res.status(200).json(requests);

  } catch (error) {
    logger.error(`Error in getSentRequests: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReceivedRequests = async (req, res) => {
  // TODO: implement pagination
  try {

    const user = res.locals.user;

    const requests = await Request.find({ receiverId: user._id, status: "pending" }).populate({
      path: "senderId",
      model: "User"
    });

    return res.status(200).json(requests);

  } catch (error) {
    logger.error(`Error in getReceivedRequests: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision } = req.body;
    const user = res.locals.user;

    const request = await Request.findOne({ _id: id, receiverId: user._id });

    if (!request) {
      return res.status(404).json({ error: `Request with id ${id} is not found` });
    }

    if (decision === "accept") {
      const newFriend = new Friend({
        user1: user._id,
        user2: request.senderId
      });
      newFriend.save();

      await Request.deleteOne({ _id: id });

      return res.status(200).json({ message: "Friend request accepted" });
    } else if (decision === "decline") {
      await Request.deleteOne({ _id: id });

      return res.status(200).json({ message: "Friend request declined" });
    } else {
      return res.status(400).json({ error: "Invalid data" });
    }

  } catch (error) {
    logger.error(`Error in updateRequestHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = res.locals.user;

    const request = await Request.findOne({ _id: id, senderId: user._id });

    if (!request) {
      return res.status(404).json({ error: `Request with id ${id} is not found` });
    }

    if (request.status === "pending") {
      await Request.deleteOne({ _id: id });
      return res.status(200).json({ message: "Request canceled" });
    } else {
      return res.status(401).json({ error: "Request is not pending" });
    }

  } catch (error) {
    logger.error(`Error in cancelRequestHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
