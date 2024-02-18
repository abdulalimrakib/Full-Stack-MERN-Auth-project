require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const postSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(202).json({
        success: false,
        message: "User already exists!",
      });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = new User({ username, email, password: hash });
        await newUser
          .save()
          .then(() => {
            res.status(201).json({
              success: true,
              message: "User created successfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Can't create user",
              error: err.message,
            });
          });
      });
    }
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(202).json({
        success: false,
        message: "Invelid email",
      });
    }
    const isMatch = bcrypt.compareSync(password, existUser.password);
    if (!isMatch) {
      res.status(202).json({
        success: false,
        message: "Invelid password",
      });
    }
    const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, {
      expiresIn: "2 days",
    });
    const { password: hashPassword, ...restData } = existUser._doc;
    res.cookie("access_token", token).status(200).json({
      success: true,
      userData: restData,
    });
  } catch (error) {
    next(error);
  }
};

const postDataFromGoogle = async (req, res, next) => {
  try {
    const { username, email, image } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, {
        expiresIn: "2 days",
      });
      const { password: hashPassword, ...restData } = existUser._doc;
      res
        .cookie("access_token", token)
        .status(200)
        .json({
          success: true,
          userData: restData,
        });
    } else {
      const generetedPassword = Math.random().toString(36).slice(-8);

      bcrypt.hash(generetedPassword, saltRounds, async (err, hash) => {
        const newUser = new User({ username, email, password: hash, image });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
          expiresIn: "2 days",
        });
        const { password: hashPassword, ...restData } = newUser._doc;
        res
          .cookie("access_token", token)
          .status(200)
          .json({
            success: true,
            userData: restData,
          });
      });
    }
  } catch (error) {
    next(error);
  }
};

const signOutAccount = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json("Successfully Sing-out !!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSignup,
  postLogin,
  postDataFromGoogle,
  signOutAccount,
};
