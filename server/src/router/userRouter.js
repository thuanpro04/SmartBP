const express = require("express");
const {
  runAIAnalysis,
  getUserInfo,
  saveInfoMeasureBloodPressure,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const userRouter = express.Router();
userRouter.get("/analyze/:userId", protect, runAIAnalysis);
userRouter.get("/info/:id", protect, getUserInfo);
userRouter.post("/save", saveInfoMeasureBloodPressure);
module.exports = userRouter;
