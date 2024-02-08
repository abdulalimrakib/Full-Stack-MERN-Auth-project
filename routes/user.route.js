const { verifyToken } = require("../config/verifyToken")
const { updateUser } = require("../controllers/user.controller")

const router = require("express").Router()

router.post("/update/:id", verifyToken, updateUser)

module.exports = router