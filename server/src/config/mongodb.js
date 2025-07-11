const mongoose = require("mongoose");
const connect_mongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully !!");
  } catch (error) {
    console.log("Connect mongoose fail: ", error);
  }
};
module.exports = connect_mongoose;
