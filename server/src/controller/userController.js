const tf = require("@tensorflow/tfjs");
const { getUserById } = require("./authController");
const HealthReading = require("../models/HealthReading");
const UserModel = require("../models/User");
const ALL_TAGS = [
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
];
const TAG_DISPLAY_NAMES = {
  vui_ve: "Vui vẻ",
  binh_thuong: "Bình thường",
  stress: "Căng thẳng",
  lo_lang: "Lo lắng",
  an_man: "Ăn mặn",
  uong_ca_phe: "Uống cà phê",
  uong_ruou_bia: "Uống rượu/bia",
  tap_the_duc: "Tập thể dục",
  di_bo: "Đi bộ",
  nghi_ngoi: "Nghỉ ngơi",
  ngu_ngon: "Ngủ ngon",
  thieu_ngu: "Thiếu ngủ",
  da_uong_thuoc: "Đã uống thuốc",
  quen_uong_thuoc: "Quên uống thuốc",
};
function generateSuggestion(tag, effect) {
  const displayName = TAG_DISPLAY_NAMES[tag] || tag;
  if (effect > 0) {
    const suggestions = {
      stress: `💡 Căng thẳng làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy thử các bài tập hít thở sâu, meditation hoặc yoga để thư giãn.`,
      lo_lang: `💡 Lo lắng làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy thử kỹ thuật thư giãn hoặc nói chuyện với bạn bè.`,
      an_man: `💡 Ăn mặn làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy giảm muối, tăng rau xanh và uống nhiều nước.`,
      uong_ca_phe: `💡 Cà phê làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy giảm caffeine hoặc thử trà thảo mộc.`,
      uong_ruou_bia: `💡 Rượu/bia làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy hạn chế để bảo vệ tim mạch.`,
      thieu_ngu: `💡 Thiếu ngủ làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy ngủ đủ 7-8 tiếng và tạo thói quen ngủ tốt.`,
      quen_uong_thuoc: `💡 Quên uống thuốc làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy đặt báo thức hoặc dùng hộp thuốc theo ngày.`,
      default: `💡 ${displayName} làm tăng huyết áp của bạn ${effect.toFixed(
        1
      )} mmHg. Hãy chú ý và điều chỉnh lối sống phù hợp.`,
    };
    return suggestions[tag] || suggestions["default"];
  } else {
    const suggestions = {
      tap_the_duc: `✅ Tập thể dục giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Tuyệt vời! Hãy duy trì 30 phút/ngày.`,
      di_bo: `✅ Đi bộ giúp giảm huyết áp của bạn ${Math.abs(effect).toFixed(
        1
      )} mmHg. Hãy tăng lên 8.000-10.000 bước/ngày.`,
      nghi_ngoi: `✅ Nghỉ ngơi giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Hãy dành 15-30 phút thư giãn mỗi ngày.`,
      ngu_ngon: `✅ Ngủ ngon giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Hãy duy trì giấc ngủ chất lượng!`,
      da_uong_thuoc: `✅ Uống thuốc đúng giờ giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Hãy tiếp tục tuân thủ!`,
      vui_ve: `✅ Tâm trạng vui vẻ giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Hãy tìm niềm vui mỗi ngày!`,
      default: `✅ ${displayName} có tác dụng tích cực, giúp giảm huyết áp của bạn ${Math.abs(
        effect
      ).toFixed(1)} mmHg. Hãy duy trì!`,
    };
    return suggestions[tag] || suggestions["default"];
  }
}
const oneHotEncode = (tags, allTags) => {
  return allTags.map((tag) => tags.includes(tag));
};
function getTopSuggestions(analysis, topN = 3, minConfidence = 0.15) {
  return analysis
    .filter((item) => item.confidence >= minConfidence)
    .sort((a, b) => Math.abs(b.effect) - Math.abs(a.effect))
    .slice(0, topN);
}

async function analyzeUserData(userId, readings) {
  try {
    console.log(
      `🔍 Phân tích user ${userId} với ${readings.length} bản ghi...`
    );
    const features = [];
    const labels = [];
    readings.forEach((reading) => {
      const oneHotTags = oneHotEncode(reading.tags, ALL_TAGS);
      features.push(oneHotTags);
      labels.push(reading.systolic);
    });
    const x = tf.tensor2d(features);
    const y = tf.tensor1d(labels);
    // Tạo mô hình
    const model = tf.sequential({
      layers: [tf.layers.dense({ units: 1, inputShape: [ALL_TAGS.length] })],
    });
    model.compile({
      optimizer: tf.train.adam(0.01),
      loss: "meanSquaredError",
    });
    await model.fit(x, y, {
      epochs: 200,
      verbose: 0,
    });
    const weights = model.getWeights()[0].dataSync();
    // Tạo insights
    const insights = [];
    for (let i = 0; i < ALL_TAGS.length; i++) {
      const tag = ALL_TAGS[i];
      const effect = weights[i];
      // Tính số lần tag xuất hiện
      const tagCount = readings.filter((r) => r.tags.includes(tag)).length;
      const confidence = tagCount / readings.length;
      // Chỉ lưu tag có tác động đáng kể và xuất hiện đủ nhiều
      if (Math.abs(effect) > 2 && confidence > 0.1) {
        insights.push({
          userId,
          tag,
          tagDisplayName: TAG_DISPLAY_NAMES[tag],
          effect: parseFloat(effect.toFixed(1)),
          confidence: parseFloat(confidence.toFixed(2)),
          suggestions: generateSuggestion(tag, effect),
          tagCount,
          totalReadings: readings.length,
        });
      }
    }
    // Sắp xếp theo mức độ ảnh hưởng
    insights.sort((a, b) => Math.abs(b.effect));
    console.log(`✅ User ${userId}: Tìm thấy ${insights.length} insights`);
    //Giải phóng bộ nhớ
    x.dispose();
    y.dispose();
    model.dispose();
    const analysis = getTopSuggestions(insights);
    return analysis;
  } catch (error) {
    console.error(`❌ Lỗi phân tích user ${userId}:`, error.message);
    return [];
  }
}
//2. AI phân tích tác động của hành vi đến huyết áp
// sau khi đo or sau nhìu ngày đo dựa vào tag => gợi ý mỗi tag đó
// ví dụ thiếu ngủ => 💡 Thiếu ngủ làm tăng huyết áp của bạn 4.1 mmHg. Hãy ngủ đủ 7-8 tiếng và tạo thói quen ngủ tốt.
exports.runAIAnalysis = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log("\n🚀 Bắt đầu phân tích AI...");
    const users = await HealthReading.findOne({ userId });
    if (!users) {
      return res.status(404).json({
        message: "User not found !!!",
      });
    }
    if (users.readings.length < 20) {
      console.log(
        `❌ User ${userId}: Không đủ dữ liệu (${readings.length} < 20)`
      );
      return res.status(400).json({
        message: `❌ User ${userId}: Không đủ dữ liệu (${readings.length} < 20)`,
      });
    }
    const userInsights = await analyzeUserData(users.userId, users.readings);

    return res.status(200).json({
      message: "Analyze successfully !!!",
      userInsights,
    });
  } catch (error) {
    console.log("Analysis error: ", error);
  }
};
exports.saveInfoMeasureBloodPressure = async (req, res) => {
  const { userId, dataBP } = req.body;
  try {
    if (!userId || !dataBP) {
      return res.status(400).json({
        message: "Missing required fields: userId or dataBP",
      });
    }
    const userExisting = await HealthReading.findOne({ userId });
    if (!userExisting) {
      await HealthReading.create({
        userId,
        readings: [dataBP],
      });
      return res.status(200).json({
        message: "Create health reading successfully !!",
      });
    }
    userExisting.readings.push(dataBP);
    await userExisting.save();
    res.status(200).json({
      message: "Update blood pressure data successfully!",
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found !!!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Server error: save info blood pressure ${error}`,
    });
  }
};
exports.getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found !!!",
      });
    }
    return res
      .status(200)
      .json({ message: "Get user info successfully !!", user });
  } catch (error) {
    console.log("Get user error: ", error);
  }
};

