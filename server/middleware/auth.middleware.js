import jwt from "jsonwebtoken";
export const Authentication = (req, res, next) => {
  try {
    const token = req.cookies.refresh_Token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Authentication failed" });
  }
};

export const Authorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  } else {
    next();
  }
};

export const AuthCheck = async (req, res) => {
  const user = req.user;
  console.log("AuthCheck called, user:", user);
  if (user) {
    return res.status(200).json({
      status: true,
      message: "User authenticated",
      user: user,
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: No user found",
    });
  }
};

