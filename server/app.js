require("./config/database");
const path = require("path")

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

const app = express();

// const __dirname = path.resolve()

// app.use(express.static(path.join(__dirname, '/client/dist')))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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
