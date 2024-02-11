const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return res.status(390).json("Login your account first");
    if (req.body.password) {
      console.log(req.body.password);
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          image: req.body.image,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return res.status(390).json("Login your account first");
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted !!!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
