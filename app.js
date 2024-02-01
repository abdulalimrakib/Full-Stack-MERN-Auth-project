require("./config/database")

const express = require("express")

const app = express()

app.get("/", (req, res) => {
res.status(200).send("Home Page")
})

module.exports = app