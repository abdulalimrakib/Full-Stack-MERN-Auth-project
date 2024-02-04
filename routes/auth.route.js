const { postSignup, postLogin, postDataFromGoogle } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/signup", postSignup)
router.post("/login", postLogin)
router.post("/google", postDataFromGoogle)

module.exports = router