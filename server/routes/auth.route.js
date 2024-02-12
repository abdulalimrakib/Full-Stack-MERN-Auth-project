const { postSignup, postLogin, postDataFromGoogle, signOutAccount } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/signup", postSignup)
router.post("/login", postLogin)
router.post("/google", postDataFromGoogle)
router.get("/sign-out", signOutAccount)

module.exports = router