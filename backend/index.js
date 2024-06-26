import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import queryRoutes from "./routes/query.routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
var allowCrossDomain = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(cookieParser());

const uri = process.env.MONGO_CONNECTION
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/query", queryRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
