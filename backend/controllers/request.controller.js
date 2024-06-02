import logger from "../utils/logger.js";
import Request from '../models/request.model.js';

export const sendRequestHandler = async (req, res) => {
  try {

    const { receiverId } = req.params;
    const user = res.locals.user;

    if (user._id === receiverId) {
      return res.status(401).json({ error: "Cannot send request to yourself" });
    }

    const existingRequest = await Request.findOne({ senderId: user._id, receiverId });

    if (existingRequest) {
      return res.status(400).json({ error: "Request already sent" });
    }

    const newRequest = new Request({
      senderId: user._id,
      receiverId
    });

    if (newRequest) {
      await newRequest.save();
      return res.status(200).json(newRequest);
    } else {
      return res.status(400).json({ error: "Failed to send request" });
    }
  } catch (error) {
    logger.error(`Error in sendRequestHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSentRequests = async (req, res) => {
  try {

    const user = res.locals.user;

    const requests = await Request.find({ senderId: user._id, status: "pending" });

    return res.status(200).json(requests);

  } catch (error) {
    logger.error(`Error in getSentRequests: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {

    const user = res.locals.user;

    const requests = await Request.find({ receiverId: user._id, status: "pending" });

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
      // update request, status ==> accepted
      // add the sender id to friens table
      // remove the request from the table
    } else if (decision === "decline") {
      // update request, status ==> declined
      // remove request from the table
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
      // update request, status ==> cancelled
      // remove the request from the Request table
    } else {
      return res.status(401).json({ error: "Request is not pending" });
    }

  } catch (error) {
    logger.error(`Error in cancelRequestHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
