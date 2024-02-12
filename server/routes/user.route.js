const { verifyToken } = require("../config/verifyToken")
const { updateUser, deleteUser } = require("../controllers/user.controller")

const router = require("express").Router()

router.post("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)

module.exports = router