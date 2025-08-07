const express = require("express");
const {
  handleLoginWithGoogle,
  handleUpdateUserInfo,
} = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");
const authRouter = express.Router();
authRouter.post("/login", handleLoginWithGoogle);
authRouter.post("/update",protect, handleUpdateUserInfo);
module.exports = authRouter;
