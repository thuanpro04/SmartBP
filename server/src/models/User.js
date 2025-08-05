const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  // Thông tin sức khỏe có thể lưu riêng hoặc nhúng vào user
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  height: {
    type: Number, // cm
    min: 100,
    max: 250,
  },
  weight: {
    type: Number, // kg
    min: 30,
    max: 300,
  },
  // BMI sẽ được tính tự động
  bmi: {
    type: Number,
    min: 10,
    max: 50,
  },
  medicalHistory: {
    // Tiền sử bệnh tim mạch
    cardiovascularDiseases: [
      {
        type: String,
        enum: [
          "hypertension",
          "coronary_artery_disease",
          "heart_failure",
          "arrhythmia",
          "stroke",
          "peripheral_artery_disease",
        ],
      },
    ], // Các bệnh khác ảnh hưởng đến huyết áp
    otherConditions: [
      {
        type: String,
        enum: [
          "diabetes_type1",
          "diabetes_type2",
          "kidney_disease",
          "sleep_apnea",
          "thyroid_disorder",
          "obesity",
        ],
      },
    ],
    currentMedications: [
      {
        name: String,
        type: {
          type: String,
          enum: [
            "ace_inhibitor",
            "arb",
            "beta_blocker",
            "calcium_channel_blocker",
            "diuretic",
            "other_bp_med",
            "diabetes_med",
            "other",
          ],
        },
        dosage: String,
        frequency: String, // daily, twice_daily, etc.
        startDate: Date,
      },
    ],
    // Dị ứng thuốc
    allergies: [String],
  },
  lifestyle: {
    smokingStatus: {
      type: String,
      enum: ["never", "former", "current"],
      default: "never",
    },
  },
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
