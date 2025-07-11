const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  // Thông tin sức khỏe có thể lưu riêng hoặc nhúng vào user
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
