import bycrypt from "bcrypt";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const UserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({
      userName: username,
    });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hassedPassword = await bycrypt.hashSync(
      password,
      bycrypt.genSaltSync(10)
    );
    const user = await User.create({
      userName: username,
      email: email,
      password: hassedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6d",
  });
};

// refresh token
const generateRefreshToken = async (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const passwordMatch = await bycrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = await generateAccessToken({
      id: user.id,
      username: user?.userName,
      email: user.email,
      role: user?.role,
    });
    const refreshToken = await generateRefreshToken({
      id: user.id,
      username: user?.userName,
      email: user.email,
      role: user?.role,
    });

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // Set access token to expire in 5 minutes
    res.cookie("access_Token", accessToken, {
      httpOnly: true,
      // maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // Set refresh token to expire in 15 minutes
    res.cookie("refresh_Token", refreshToken, {
      httpOnly: true,
      // max age 6 days
      maxAge: 6 * 24 * 60 * 60 * 1000,
      // maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user?.id,
        email: user?.email,
        userName: user?.userName,
        role: user?.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const RefreshToken = async (req, res) => {
  // Get the refresh token from cookies instead of req.body
  const refreshToken = req.cookies.refresh_Token;
  if (!refreshToken) {
    return res.status(403).json({ message: "No refresh token provided" });
  }

  try {
    const user = await User.findOne({ "refreshTokens.token": refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token and refresh token
    const newRefreshToken = await generateRefreshToken({ id: user.id });

    // Update the refresh tokens in the database
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    // Set the new tokens as cookies
    res.cookie("access_Token", accessToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 5 minutes
    });
    res.cookie("refresh_Token", newRefreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const LogoutUser = async (req, res) => {
  const refreshToken = req.cookies.refresh_Token;
  try {
    const user = await User.findOne({ "refreshTokens.token": refreshToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    user.refreshTokens = user.refreshTokens.filter(
      (tokenObj) => tokenObj.token !== refreshToken
    );
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


