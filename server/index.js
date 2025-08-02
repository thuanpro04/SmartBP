const express = require("express");
const cors = require("cors");
const connect_mongoose = require("./src/config/mongodb");
const authRouter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
require("dotenv").config();
const PORT = process.env.PORT || 3004;
const app = express();
app.use(cors());
app.use(express.json());
connect_mongoose();
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/user', userRouter)
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
