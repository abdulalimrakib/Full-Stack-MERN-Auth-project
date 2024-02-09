const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;
  console.log(req.cookies);
  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, "helloworld", (err, user) => {
    console.log(err);
    // console.log(user);
    if (err) return res.status(403).json("Token is not valid!");

    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
