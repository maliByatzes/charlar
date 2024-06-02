import logger from "../utils/logger.js";
import Request from '../models/request.model.js';

// Send a request handler

export const sendRequestHandler = async (req, res) => {
  try {

    const { receiverId } = req.params;
    const user = res.locals.user;

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
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get requests handler

// Accept or decline request handler

// Cancel request handler
