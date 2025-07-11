const express = require("express");
const { handleLoginWithGoogle } = require("../controller/authController");
const authRouter = express.Router();
authRouter.post("/login", handleLoginWithGoogle);
module.exports = authRouter;
