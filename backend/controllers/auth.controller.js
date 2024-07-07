import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/generateTokens.js";
import logger from "../utils/logger.js";
import * as argon2 from 'argon2';

export const registerHandler = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if (newUser) {
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    logger.error(`Error in registerHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await Promise.all([
      generateAccessToken(user._id, res),
      generateRefreshToken(user._id, res)
    ]);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    logger.error(`Error in loginHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutHandler = async (req, res) => {
  try {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.status(200).json({ message: 'success' });
  } catch (error) {
    logger.error(`Error in logoutHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(403).json({ error: "Unauthorized - No refresh token" });
    }

    const userId = await verifyToken(refreshToken);

    if (!userId) {
      return res.status(403).json({ error: "Unauthorized - Invalid refresh token" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ error: "Unauthorized - Invalid user" });
    }

    await generateAccessToken(user._id, res);

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    logger.error(`Error in refreshTokenHandler: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
