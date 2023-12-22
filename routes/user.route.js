// List of imports
const express = require("express")
const router = express.Router()
const {displayWelcome, registerUser, signin, getDashboard} = require("../controllers/user.controller")

// Routes
router.get("/welcome", displayWelcome)
router.post("/register", registerUser)
router.post("/signin", signin)
router.get("/dashboard", getDashboard)

module.exports = router

