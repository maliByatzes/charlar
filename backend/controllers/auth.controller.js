import User from "../models/user.model.js";
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
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Handler

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isMatch = await argon2.verify(user.password, password);

  if (!user || !isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // generate access token and refresh token

  return res.status(200).json({
    _id: user._id,
    email: user.email,
    username: user.username,
    gender: user.gender,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  });
};

// Logout Handler

export const logoutHandler = async (req, res) => {
  res.send('Logout Handler');
};

// Refresh Token Handler

export const refreshTokenHandler = async (req, res) => {
  res.send('Refresh Token Handler');
};
