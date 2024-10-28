import express from "express";
import "dotenv/config.js";
import dbConnect from "./config/dbConnect.js";
import mainRoutes from "./routes/main.route.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(mainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
