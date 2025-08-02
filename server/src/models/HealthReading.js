const mongoose = require("mongoose");

const healthReadingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  readings: [
    {
      timestamp: { type: Date },
      systolic: { type: Number, required: true },
      diastolic: { type: Number, required: true },
      pulse: { type: Number, required: true },
      tags: [
        {
          type: String,
          enum: [
            "vui_ve",
            "binh_thuong",
            "stress",
            "lo_lang",
            "an_man",
            "uong_ca_phe",
            "uong_ruou_bia",
            "tap_the_duc",
            "di_bo",
            "nghi_ngoi",
            "ngu_ngon",
            "thieu_ngu",
            "da_uong_thuoc",
            "quen_uong_thuoc",
          ],
          required: true,
        },
      ],
    },
  ],
  createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("HealthReading", healthReadingSchema);
