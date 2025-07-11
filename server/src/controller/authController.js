const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const generateToken = (id, email) => {
  const payload = {
    email,
    id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.getUserById = async (_id) => {
  return await UserModel.findById({ _id });
};
exports.updateUserById = async (_id, data) => {
  return await UserModel.findByIdAndUpdate(_id, {
    ...data,
    updateAt: Date.now(),
  });
};
exports.handleLoginWithGoogle = async (req, res) => {
  const { email, name} = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Tìm user theo email
    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // Nếu đã có user → trả về kèm accessToken mới
      const token = generateToken(existingUser._id, existingUser.email);
      return res.status(200).json({
        message: "User already exists",
        user: { ...existingUser.toObject(), accessToken: token },
      });
    }

    // Nếu chưa có → tạo mới
    const newUser = new UserModel({
      email,
      name,

    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.email);

    return res.status(200).json({
      message: "Created user successfully",
      user: { ...newUser.toObject(), accessToken: token },
    });
  } catch (error) {
    console.log("Login with google error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

