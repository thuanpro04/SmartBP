const express = require("express");
const { runAIAnalysis, getUserInfo } = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const userRouter = express.Router();
userRouter.get("/analyze/:userId", protect, runAIAnalysis);
userRouter.get("/info/:id", protect, getUserInfo);
module.exports = userRouter;
