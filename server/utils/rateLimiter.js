import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    // windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per 15 minutes
    standardHeaders: true, // Returns rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers
    message: "Too many requests from this IP, please try again after 15 minutes",
  
    // Custom handler to send JSON response
    handler: (req, res, next) => {
      res.status(429).json({
        status: false,
        message: "Too many requests from this IP, please try again after 15 minutes",
      });
    },
  });