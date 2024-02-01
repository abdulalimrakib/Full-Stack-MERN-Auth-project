const User = require("../models/user.model");

const postSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(202).send("User already exists!");
        } else {
            const newUser = new User({ username, email, password });
            await newUser.save()
                .then(() => {
                    res.status(201).send({
                        message: "User created successfully"
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Can't create user",
                        error: err.message
                    });
                });
        }
    } catch (error) {
        next(error)
    }
};

module.exports = {
    postSignup
};
