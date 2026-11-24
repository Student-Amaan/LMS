const express = require("express");
const {loginController, getMe} = require("./auth.controller");
const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorization");



const authRouter = express.Router()

authRouter.post("/login", loginController)
authRouter.get("/profile", authenticate, authorize("admin", "teacher"), getMe)

module.exports = authRouter