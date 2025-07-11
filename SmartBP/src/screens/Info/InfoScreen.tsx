import React, { useState } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  TextComponent,
} from '../components/layout';
import { appSizes } from '../../utils/appSizes';
import { appColors } from '../../utils/appColors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const InfoScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('basics');

  const categories = [
    { id: 'basics', title: 'Cơ bản', icon: 'info' },
    { id: 'ranges', title: 'Chỉ số', icon: 'speed' },
    { id: 'causes', title: 'Nguyên nhân', icon: 'search' },
    { id: 'prevention', title: 'Phòng ngừa', icon: 'shield' },
    { id: 'solutions', title: 'Giải pháp', icon: 'healing' },
    { id: 'limitations', title: 'Hạn chế', icon: 'block' },
    { id: 'tips', title: 'Lời khuyên', icon: 'lightbulb' },
  ];

  const renderBasics = () => (
    <View style={styles.contentContainer}>
      <TextComponent label="Huyết áp là gì?" style={styles.sectionTitle} />
      <View style={styles.card}>
        <TextComponent
          label="Huyết áp là áp lực của máu lên thành động mạch khi tim bơm máu. Nó được đo bằng 2 số:"
          style={styles.cardText}
        />
        <View style={styles.bpExplanation}>
          <View style={styles.bpItem}>
            <TextComponent label="120" style={styles.bpNumber} />
            <TextComponent label="Tâm thu (Systolic)" style={styles.bpLabel} />
            <TextComponent
              label="Áp lực khi tim co bóp"
              style={styles.bpDescription}
            />
          </View>
          <TextComponent label="/" style={styles.bpDivider} />
          <View style={styles.bpItem}>
            <TextComponent label="80" style={styles.bpNumber} />
            <TextComponent
              label="Tâm trương (Diastolic)"
              style={styles.bpLabel}
            />
            <TextComponent
              label="Áp lực khi tim nghỉ"
              style={styles.bpDescription}
            />
          </View>
        </View>
      </View>

      <TextComponent
        label="Tại sao cần theo dõi huyết áp?"
        style={styles.sectionTitle}
      />
      <View style={styles.card}>
        <View style={styles.importanceList}>
          <View style={styles.importanceItem}>
            <MaterialIcons
              name="favorite"
              size={24}
              color={appColors.primary}
            />
            <TextComponent
              label="Bảo vệ tim mạch"
              style={styles.importanceText}
            />
          </View>
          <View style={styles.importanceItem}>
            <MaterialIcons
              name="visibility"
              size={24}
              color={appColors.primary}
            />
            <TextComponent
              label="Phát hiện sớm bệnh lý"
              style={styles.importanceText}
            />
          </View>
          <View style={styles.importanceItem}>
            <MaterialIcons
              name="local-hospital"
              size={24}
              color={appColors.primary}
            />
            <TextComponent
              label="Ngăn ngừa biến chứng"
              style={styles.importanceText}
            />
          </View>
          <View style={styles.importanceItem}>
            <MaterialIcons
              name="trending-up"
              size={24}
              color={appColors.primary}
            />
            <TextComponent
              label="Theo dõi sức khỏe"
              style={styles.importanceText}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderRanges = () => (
    <View style={styles.contentContainer}>
      <TextComponent label="Phân loại huyết áp" style={styles.sectionTitle} />

      <View style={[styles.card, styles.normalCard]}>
        <View style={styles.rangeHeader}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <TextComponent label="Bình thường" style={styles.rangeTitle} />
        </View>
        <TextComponent label="< 120/80 mmHg" style={styles.rangeValue} />
        <TextComponent
          label="Huyết áp lý tưởng, duy trì lối sống khỏe mạnh"
          style={styles.rangeDescription}
        />
      </View>

      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.rangeHeader}>
          <MaterialIcons name="info" size={24} color="#FF9800" />
          <TextComponent label="Hơi cao" style={styles.rangeTitle} />
        </View>
        <TextComponent label="120-129/< 80 mmHg" style={styles.rangeValue} />
        <TextComponent
          label="Cần chú ý thay đổi lối sống"
          style={styles.rangeDescription}
        />
      </View>

      <View style={[styles.card, styles.stage1Card]}>
        <View style={styles.rangeHeader}>
          <MaterialIcons name="warning" size={24} color="#FF5722" />
          <TextComponent label="Cao huyết áp độ 1" style={styles.rangeTitle} />
        </View>
        <TextComponent label="130-139/80-89 mmHg" style={styles.rangeValue} />
        <TextComponent
          label="Nên tham khảo ý kiến bác sĩ"
          style={styles.rangeDescription}
        />
      </View>

      <View style={[styles.card, styles.stage2Card]}>
        <View style={styles.rangeHeader}>
          <MaterialIcons name="dangerous" size={24} color="#F44336" />
          <TextComponent label="Cao huyết áp độ 2" style={styles.rangeTitle} />
        </View>
        <TextComponent label="≥ 140/90 mmHg" style={styles.rangeValue} />
        <TextComponent
          label="Cần điều trị y tế ngay lập tức"
          style={styles.rangeDescription}
        />
      </View>

      <View style={[styles.card, styles.crisisCard]}>
        <View style={styles.rangeHeader}>
          <MaterialIcons name="emergency" size={24} color="#9C27B0" />
          <TextComponent label="Khẩn cấp" style={styles.rangeTitle} />
        </View>
        <TextComponent label="≥ 180/120 mmHg" style={styles.rangeValue} />
        <TextComponent
          label="Cần cấp cứu y tế ngay"
          style={styles.rangeDescription}
        />
      </View>
    </View>
  );

  const renderCauses = () => (
    <View style={styles.contentContainer}>
      <TextComponent
        label="Nguyên nhân cao huyết áp"
        style={styles.sectionTitle}
      />

      <View style={styles.card}>
        <TextComponent
          label="🔴 Cao huyết áp nguyên phát (90-95% ca)"
          style={styles.cardSubtitle}
        />
        <TextComponent
          label="Không rõ nguyên nhân cụ thể, thường do kết hợp nhiều yếu tố:"
          style={styles.cardText}
        />
        <View style={styles.causesList}>
          <TextComponent
            label="• Di truyền từ gia đình"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Tuổi tác (> 45 tuổi nam, > 55 tuổi nữ)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Giới tính (nam > nữ trước mãn kinh)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Chủng tộc (người da đen có nguy cơ cao)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Lối sống không lành mạnh"
            style={styles.causeItem}
          />
          <TextComponent label="• Stress kéo dài" style={styles.causeItem} />
          <TextComponent label="• Kháng insulin" style={styles.causeItem} />
        </View>
      </View>

      <View style={styles.card}>
        <TextComponent
          label="🟡 Cao huyết áp thứ phát (5-10% ca)"
          style={styles.cardSubtitle}
        />
        <TextComponent
          label="Do các bệnh lý cụ thể gây ra:"
          style={styles.cardText}
        />
        <View style={styles.causesList}>
          <TextComponent
            label="• Bệnh thận (hẹp động mạch thận, suy thận)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Bệnh nội tiết (cường giáp, u tuyến thượng thận)"
            style={styles.causeItem}
          />
          <TextComponent label="• Bệnh tim bẩm sinh" style={styles.causeItem} />
          <TextComponent
            label="• Thuốc (corticosteroid, thuốc tránh thai)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Chất kích thích (cocaine, amphetamine)"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Hội chứng ngưng thở khi ngủ"
            style={styles.causeItem}
          />
          <TextComponent
            label="• Thai nghén (tiền sản giật)"
            style={styles.causeItem}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TextComponent
          label="⚡ Yếu tố kích hoạt tức thời"
          style={styles.cardSubtitle}
        />
        <View style={styles.causesList}>
          <TextComponent label="• Stress cấp tính" style={styles.causeItem} />
          <TextComponent label="• Đau đớn" style={styles.causeItem} />
          <TextComponent label="• Lạnh" style={styles.causeItem} />
          <TextComponent label="• Caffeine" style={styles.causeItem} />
          <TextComponent
            label="• Hoạt động thể lực mạnh"
            style={styles.causeItem}
          />
          <TextComponent label="• Thiếu ngủ" style={styles.causeItem} />
          <TextComponent label="• Thuốc lá" style={styles.causeItem} />
        </View>
      </View>
    </View>
  );

  const renderPrevention = () => (
    <View style={styles.contentContainer}>
      <TextComponent label="Biện pháp phòng ngừa" style={styles.sectionTitle} />

      <View style={styles.card}>
        <TextComponent
          label="🍎 Chế độ dinh dưỡng DASH"
          style={styles.cardSubtitle}
        />
        <TextComponent
          label="Chế độ ăn được chứng minh giúp giảm huyết áp hiệu quả:"
          style={styles.cardText}
        />
        <View style={styles.preventionList}>
          <TextComponent
            label="✅ Nhiều rau xanh, trái cây (5-9 phần/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="✅ Ngũ cốc nguyên hạt (6-8 phần/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="✅ Thịt nạc, cá, gà (≤ 2 phần/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="✅ Các loại hạt, đậu (4-5 phần/tuần)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="✅ Sữa ít béo (2-3 ly/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="❌ Giảm muối (< 6g/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="❌ Hạn chế đường, đồ ngọt"
            style={styles.preventionItem}
          />
          <TextComponent
            label="❌ Ít chất béo bão hòa"
            style={styles.preventionItem}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TextComponent
          label="🏃‍♂️ Vận động thể lực"
          style={styles.cardSubtitle}
        />
        <View style={styles.preventionList}>
          <TextComponent
            label="• Aerobic: 150 phút/tuần (cường độ vừa)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Hoặc 75 phút/tuần (cường độ mạnh)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Tập cơ: 2-3 lần/tuần"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Đi bộ nhanh 30 phút/ngày"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Bơi lội, đạp xe, khiêu vũ"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Tránh vận động quá sức"
            style={styles.preventionItem}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TextComponent label="🧘‍♀️ Quản lý stress" style={styles.cardSubtitle} />
        <View style={styles.preventionList}>
          <TextComponent
            label="• Thiền định, yoga (20-30 phút/ngày)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Thở sâu, thư giãn cơ"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Ngủ đủ 7-8 tiếng/đêm"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Duy trì mối quan hệ xã hội tích cực"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Tìm sở thích, giải trí lành mạnh"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Tránh căng thẳng công việc"
            style={styles.preventionItem}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TextComponent
          label="🎯 Duy trì cân nặng lý tưởng"
          style={styles.cardSubtitle}
        />
        <View style={styles.preventionList}>
          <TextComponent
            label="• BMI: 18.5-24.9 kg/m²"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Vòng eo: <90cm (nam), <80cm (nữ)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Giảm cân từ từ (0.5-1kg/tuần)"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Theo dõi cân nặng hàng ngày"
            style={styles.preventionItem}
          />
          <TextComponent
            label="• Kết hợp ăn kiêng và vận động"
            style={styles.preventionItem}
          />
        </View>
      </View>
    </View>
  );

  const renderSolutions = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Giải pháp điều trị</Text>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🥗 Thay đổi lối sống (Bước đầu)</Text>
        <Text style={styles.cardText}>
          Áp dụng từ 3-6 tháng trước khi dùng thuốc:
        </Text>
        <View style={styles.solutionsList}>
          <Text style={styles.solutionItem}>
            📊 Giảm 5-10kg cân nặng → Giảm 5-20 mmHg
          </Text>
          <TextComponent
            label="🧂 Giảm muối <6g/ngày → Giảm 2-8 mmHg"
            style={styles.solutionItem}
          />
          <Text style={styles.solutionItem}>
            🏃 Vận động đều → Giảm 4-9 mmHg
          </Text>
          <Text style={styles.solutionItem}>
            🚭 Bỏ thuốc lá → Giảm 2-4 mmHg
          </Text>
          <Text style={styles.solutionItem}>
            🍷 Hạn chế rượu → Giảm 2-4 mmHg
          </Text>
          <Text style={styles.solutionItem}>
            🥬 Chế độ DASH → Giảm 8-14 mmHg
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>💊 Điều trị bằng thuốc</Text>
        <Text style={styles.cardText}>
          Khi thay đổi lối sống không đủ hiệu quả:
        </Text>
        <View style={styles.solutionsList}>
          <Text style={styles.solutionHeader}>🔸 Nhóm thuốc chính:</Text>
          <Text style={styles.solutionItem}>
            • ACE inhibitors (enalapril, lisinopril)
          </Text>
          <Text style={styles.solutionItem}>• ARBs (losartan, valsartan)</Text>
          <Text style={styles.solutionItem}>
            • Thuốc lợi tiểu (hydrochlorothiazide)
          </Text>
          <Text style={styles.solutionItem}>
            • Chẹn kênh canxi (amlodipine)
          </Text>
          <Text style={styles.solutionItem}>• Beta-blocker (metoprolol)</Text>
          <Text style={styles.solutionHeader}>⚠️ Lưu ý:</Text>
          <Text style={styles.solutionItem}>• Phải theo đơn bác sĩ</Text>
          <Text style={styles.solutionItem}>
            • Uống đều đặn, không tự ý ngừng
          </Text>
          <Text style={styles.solutionItem}>• Theo dõi tác dụng phụ</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🌿 Liệu pháp bổ sung</Text>
        <View style={styles.solutionsList}>
          <Text style={styles.solutionItem}>• Tỏi: 600-900mg/ngày</Text>
          <Text style={styles.solutionItem}>• Omega-3: 2-3g/ngày</Text>
          <Text style={styles.solutionItem}>• Magie: 400-800mg/ngày</Text>
          <Text style={styles.solutionItem}>
            • Kali: 3.5-5g/ngày (từ thức ăn)
          </Text>
          <Text style={styles.solutionItem}>• Trà xanh: 2-3 tách/ngày</Text>
          <Text style={styles.solutionItem}>
            • Dấm táo: 1-2 muỗng canh/ngày
          </Text>
          <Text style={styles.noteText}>
            ⚠️ Chỉ bổ sung, không thay thế điều trị chính
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>📋 Theo dõi và điều chỉnh</Text>
        <View style={styles.solutionsList}>
          <Text style={styles.solutionItem}>
            • Đo huyết áp tại nhà hàng ngày
          </Text>
          <Text style={styles.solutionItem}>• Khám định kỳ 1-3 tháng/lần</Text>
          <Text style={styles.solutionItem}>• Xét nghiệm máu định kỳ</Text>
          <Text style={styles.solutionItem}>
            • Điều chỉnh thuốc theo chỉ định
          </Text>
          <Text style={styles.solutionItem}>• Ghi nhật ký sức khỏe</Text>
        </View>
      </View>
    </View>
  );

  const renderLimitations = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Hạn chế và lưu ý</Text>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🚫 Hạn chế trong chế độ ăn</Text>
        <View style={styles.limitationsList}>
          <TextComponent
            label="❌ Muối >6g/ngày (1 thìa cà phê)"
            style={styles.limitationItem}
          />
          <Text style={styles.limitationItem}>
            ❌ Thức ăn chế biến sẵn, đồ hộp
          </Text>
          <Text style={styles.limitationItem}>❌ Thức ăn nhanh, snack mặn</Text>
          <Text style={styles.limitationItem}>❌ Nước mắm, tương ớt nhiều</Text>
          <TextComponent
            label="❌ Thịt đỏ >2 lần/tuần"
            style={styles.limitationItem}
          />
          <TextComponent
            label="❌ Caffeine >400mg/ngày"
            style={styles.limitationItem}
          />
          <Text style={styles.limitationItem}>❌ Chất béo trans, bão hòa</Text>
          <Text style={styles.limitationItem}>❌ Đồ ngọt, nước có gas</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🍷 Hạn chế về rượu bia</Text>
        <View style={styles.limitationsList}>
          <Text style={styles.limitationItem}>• Nam: ≤ 2 ly/ngày</Text>
          <Text style={styles.limitationItem}>• Nữ: ≤ 1 ly/ngày</Text>
          <Text style={styles.limitationItem}>
            • 1 ly = 350ml bia hoặc 150ml rượu vang
          </Text>
          <Text style={styles.limitationItem}>• Hoặc 45ml rượu mạnh</Text>
          <Text style={styles.limitationItem}>• Tốt nhất: không uống</Text>
          <Text style={styles.limitationItem}>
            • Tuyệt đối không uống khi có thuốc
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🏃‍♂️ Hạn chế trong vận động</Text>
        <View style={styles.limitationsList}>
          <Text style={styles.limitationItem}>⚠️ Tránh vận động quá sức</Text>
          <Text style={styles.limitationItem}>
            ⚠️ Không nhịn thở khi tập tạ
          </Text>
          <Text style={styles.limitationItem}>
            ⚠️ Khởi động và hồi phục đầy đủ
          </Text>
          <Text style={styles.limitationItem}>
            ⚠️ Ngừng ngay nếu: đau ngực, chóng mặt
          </Text>
          <Text style={styles.limitationItem}>
            ⚠️ Tránh sauna, phòng xông nóng
          </Text>
          <Text style={styles.limitationItem}>
            ⚠️ Tập trong điều kiện thời tiết phù hợp
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>💊 Hạn chế về thuốc</Text>
        <View style={styles.limitationsList}>
          <Text style={styles.limitationItem}>
            ❌ Thuốc chống viêm (ibuprofen, diclofenac)
          </Text>
          <Text style={styles.limitationItem}>
            ❌ Thuốc cảm lạnh chứa pseudoephedrine
          </Text>
          <Text style={styles.limitationItem}>❌ Corticosteroid dài hạn</Text>
          <Text style={styles.limitationItem}>
            ❌ Thuốc tránh thai chứa estrogen
          </Text>
          <Text style={styles.limitationItem}>
            ❌ Thuốc chống trầm cảm một số loại
          </Text>
          <Text style={styles.limitationItem}>
            ❌ Thuốc giảm cân chứa stimulant
          </Text>
          <Text style={styles.noteText}>
            ⚠️ Luôn hỏi bác sĩ trước khi dùng thuốc mới
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>😰 Hạn chế về stress</Text>
        <View style={styles.limitationsList}>
          <Text style={styles.limitationItem}>• Tránh căng thẳng kéo dài</Text>
          <Text style={styles.limitationItem}>• Không làm việc quá sức</Text>
          <Text style={styles.limitationItem}>
            • Hạn chế xem tin tức tiêu cực
          </Text>
          <Text style={styles.limitationItem}>• Tránh tranh cãi, xung đột</Text>
          <Text style={styles.limitationItem}>
            • Không thức khuya thường xuyên
          </Text>
          <Text style={styles.limitationItem}>• Tránh môi trường ồn ào</Text>
        </View>
      </View>
    </View>
  );

  const renderTips = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Lời khuyên hữu ích</Text>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>📏 Cách đo huyết áp chính xác</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>1. Ngồi yên 5 phút trước khi đo</Text>
          <Text style={styles.tipItem}>
            2. Đặt chân xuống sàn, tựa lưng vào ghế
          </Text>
          <Text style={styles.tipItem}>3. Đặt tay ngang tầm tim</Text>
          <Text style={styles.tipItem}>4. Không nói chuyện khi đo</Text>
          <Text style={styles.tipItem}>5. Đo 2-3 lần, cách nhau 1-2 phút</Text>
          <Text style={styles.tipItem}>6. Ghi lại kết quả trung bình</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>⏰ Thời điểm đo tốt nhất</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Buổi sáng: 6-10 giờ</Text>
          <Text style={styles.tipItem}>• Buổi tối: 6-10 giờ</Text>
          <Text style={styles.tipItem}>• Trước khi ăn và uống thuốc</Text>
          <Text style={styles.tipItem}>• Cùng giờ mỗi ngày</Text>
          <Text style={styles.tipItem}>• Không đo sau khi vận động</Text>
          <Text style={styles.tipItem}>• Không đo khi căng thẳng</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>🚨 Khi nào cần gặp bác sĩ</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Huyết áp ≥ 140/90 mmHg liên tục</Text>
          <Text style={styles.tipItem}>
            • Huyết áp ≥ 180/120 mmHg (khẩn cấp)
          </Text>
          <Text style={styles.tipItem}>
            • Có triệu chứng: đau đầu, chóng mặt
          </Text>
          <Text style={styles.tipItem}>• Đau ngực, khó thở</Text>
          <Text style={styles.tipItem}>• Thay đổi đột ngột huyết áp</Text>
          <Text style={styles.tipItem}>• Có tiền sử gia đình</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case 'basics':
        return renderBasics();
      case 'ranges':
        return renderRanges();
      case 'causes':
        return renderCauses();
      case 'prevention':
        return renderPrevention();
      case 'solutions':
        return renderSolutions();
      case 'limitations':
        return renderLimitations();
      case 'tips':
        return renderTips();
      default:
        return renderBasics();
    }
  };

  return (
    <ContainerComponent style={{ paddingBottom: 0 }}>
      <HeaderComponent
        style={styles.header}
        title="Thông tin & kiến thức"
        onPress={() => navigation.navigate('history')}
      />

      <View style={styles.main}>
        {/* Category Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.tab,
                  selectedCategory === category.id && styles.activeTab,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <MaterialIcons
                  name={category.icon}
                  size={20}
                  color={
                    selectedCategory === category.id
                      ? '#fff'
                      : appColors.primary
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === category.id && styles.activeTabText,
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  header: {
    borderBottomColor: appColors.border,
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
    backgroundColor: appColors.cardBg,
  },
  tabContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: appColors.primary,
  },
  activeTab: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: appColors.primary,
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  bpExplanation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  bpItem: {
    alignItems: 'center',
    flex: 1,
  },
  bpNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: appColors.primary,
    marginBottom: 4,
  },
  bpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bpDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bpDivider: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ddd',
    marginHorizontal: 16,
  },
  importanceList: {
    gap: 12,
  },
  importanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  importanceText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  rangeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rangeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  rangeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.primary,
    marginBottom: 4,
  },
  rangeDescription: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  normalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  elevatedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  stage1Card: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  stage2Card: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  crisisCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  factorsList: {
    gap: 8,
  },
  factorItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  causesList: {
    gap: 8,
  },
  causeItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  preventionList: {
    gap: 8,
  },
  preventionItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  solutionsList: {
    gap: 8,
  },
  solutionItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  solutionHeader: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginTop: 8,
  },
  limitationsList: {
    gap: 8,
  },
  limitationItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  noteText: {
    fontSize: 12,
    color: '#FF5722',
    fontStyle: 'italic',
    marginTop: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
