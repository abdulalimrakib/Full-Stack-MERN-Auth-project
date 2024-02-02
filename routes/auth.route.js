const { postSignup, postLogin } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/signup", postSignup)
router.post("/login", postLogin)

module.exports = router