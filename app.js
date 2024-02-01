require("./config/database");

const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

module.exports = app;
