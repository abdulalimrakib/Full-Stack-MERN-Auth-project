const { postSignup } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/signup", postSignup)

module.exports = router