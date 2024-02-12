require("dotenv").config()
const mongoose = require("mongoose")

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database is Connected");
    }).catch((err) => {
        console.log(err.message);
    })