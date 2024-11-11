import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/user.model.js";

export const UserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({
      userName: username,
    });

    if (existingUsername) {
      return res.status(400).json({
        status: false,
        message: "Username already exists",
      });
    }

    if (!username) {
      return res.status(400).json({
        status: false,
        message: "Username is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
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
      status: true,
      message: "User created statusfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
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
// LOGIN FUNCTION (no change from your provided code)
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bycrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Set isActive to true when the user logs in
    user.isActive = true;
    await user.save();

    const accessToken = await generateAccessToken({
      id: user.id,
      username: user.userName,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await generateRefreshToken({
      id: user.id,
      username: user.userName,
      email: user.email,
      role: user.role,
    });

    // Update refresh tokens, limit to last 5 tokens
    user.refreshTokens.push({ token: refreshToken });
    user.refreshTokens = user.refreshTokens.slice(-5);
    await user.save();

    res.cookie("access_Token", accessToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    res.cookie("refresh_Token", refreshToken, {
      httpOnly: true,
      maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// REFRESH TOKEN FUNCTION
export const RefreshToken = async (req, res) => {
  const token = req.cookies.refresh_Token;

  if (!token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    // Find the user with the provided refresh token
    const user = await User.findOne({ "refreshTokens.token": token });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken({
        id: user.id,
        username: user.userName,
        email: user.email,
        role: user.role,
      });
      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_Token;

    const user = await User.findOne({ "refreshTokens.token": refreshToken });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token.token !== refreshToken
    );
    user.isActive = false;
    await user.save();

    res.clearCookie("access_Token");
    res.clearCookie("refresh_Token");

    res.status(200).json({ message: "Logged out statusfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
