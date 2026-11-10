# THE ROOM Progress

## Current Status

- **Phase 0 — Foundation: PASS**
- **Phase 1 — 3D Workspace Shell & Controls: PASS**
- **Phase 2 — Interaction, Lighting, Materials & Audio: PASS**
- **Phase 3 — Content Integration, Panels, i18n & 2D Fallback: PASS**
- **Phase 4 — Easter Eggs, Secret Drawer, Analytics & Lookouts: PASS**
- **Phase 5 — Full Multiplayer Presence, Real-time Room Chat & Character Action Engine: PASS**
  - Live real-time multiplayer deployed to Cloudflare Worker with Durable Objects SQLite (`https://the-room-backend.mrnvdong.workers.dev`).
  - In-Room Real-Time Chat with floating 3D speech bubbles over avatars and persistent chat log dock.
  - Role-specific Character Habits & Kinematic Actions:
    - **Recruiter:** Bắt tay đối tác 🤝 (`handshake`), Soi xét hồ sơ CV 📋 (`inspect_cv`), Gật đầu duyệt 👍 (`nod_approval`), Chỉnh cà vạt 👔 (`adjust_tie`).
    - **Partner:** Gõ code trên máy / tablet 💻 (`type_device`), Tranh luận kiến trúc 📐 (`discuss_architecture`), Khoanh tay suy tư 🤔 (`think_ponder`).
    - **Friend:** Đập tay bạn hiền ✋ (`high_five`), Nhâm nhi cà phê nóng ☕ (`drink_coffee`), Thả tim cổ vũ ❤️ (`cheer`).
    - **Visitor:** Ngó nghiêng quan sát 🧭 (`look_around`), Rút điện thoại chụp ảnh với đèn flash 📸 (`take_photo`).
    - **Thief:** Rón rén lén lút 🥷 (`sneak_crouch`), Dòm ngó két sắt 🔍 (`inspect_vault`), Suỵt khẽ ẩn thân 🤫 (`blend_in`).
    - **Ghost:** Hù dọa ma mị 👻 (`spooky_boo`), Xoay lơ lửng 360° 🌀 (`twirl_float`).
    - **Robot:** Quét Laser cảm biến 🔴 (`laser_scan`), Điệu nhảy Glitch Robot 🤖 (`robot_dance`), Tự sạc năng lượng 🔋 (`recharge`).
    - **Mystery:** Cúi chào quý tộc 🎩 (`mysterious_bow`), Búng tay ma thuật 🫰 (`snap_fingers`).
    - **Universal:** Vẫy tay chào 👋 (`wave`), Vỗ tay khen ngợi 👏 (`applause`), Ngồi xuống / Đứng lên 🪑 (`sit`), Cười vui vẻ 😄 (`laugh`), Nhảy ăn mừng 🕺 (`dance`).
  - Smart Seating System: Phím `[F]` hoặc tương tác trực tiếp với Ghế bàn làm việc (Ergonomic Desk Chair) hoặc Ghế Sofa (Sectional Sofa) hoặc ngồi thư giãn tại chỗ. Tự động thoát va chạm và cho phép di chuyển mượt mà ngay khi đứng dậy.
- **Phase 6 — Architectural Visual Overhaul & Stylized 3D Character Aesthetics: PASS**
  - **SkinnedMesh GLB Character Engine (Option 2):** Thay thế toàn bộ hình khối lego/cylinder thô sơ bằng mô hình 3D thực thụ dạng SkinnedMesh (`/models/xbot.glb`) tích hợp khung xương armature và bộ animation mocap chuẩn quốc tế (`idle`, `walk`, `run`, `agree`, `headShake`, `sad_pose`, `sneak_pose`).
  - **Metaverse VR Avatar Styling (Pixar / Clay Aesthetic):** Tạo hình đồng nhất theo phong cách tham chiếu:
    - Kính VR Headset công nghệ cao với khung trắng, màn hình kính cong Holographic màu xanh Cyan phát quang rực rỡ và vệt phản chiếu gương kính.
    - Đệm tai nghe Over-ear màu tím Neon đặc trưng.
    - Mái tóc đất sét (clay hair) màu nâu hạt dẻ bồng bềnh vuốt nhọn tự nhiên.
    - Khuôn mặt tròn đất sét mềm mại, má ửng và nụ cười tươi thân thiện gắn chuẩn theo xương đầu `mixamorigHead`.
    - Bộ tech jumpsuit thể thao ôm dáng, đệm khớp và ốp bảo hộ đầu gối bo tròn (oval kneepads) chuẩn tỉ lệ.
    - Khiên năng lượng Holographic Cyber Shield xoay lơ lửng bên cạnh nhân vật.
  - **Multiplayer Skeleton Isolation:** Sử dụng `SkeletonUtils.clone` đảm bảo mọi khách truy cập (Local Player & Co-visitors) hoạt động độc lập không bị trùng lặp xương hay animation.
  - **Live Deployment:** Đã biên dịch production sạch lỗi và phát hành trực tiếp lên GitHub Pages (`https://mrnvdong.github.io/the-room/`).
  - **Role-Specific Wardrobe & Details:**
    - Recruiter: Bộ suit may đo lịch lãm, cà vạt kèm kẹp vàng, tay xách vali tài liệu da bóng.
    - Partner: Kính thực tế tăng cường AR Glowing Cyan, cầm máy tính bảng hiển thị mã code.
    - Friend: Áo hoodie streetwear hiện đại, tai nghe over-ear quàng cổ, ly cà phê gốm nóng bốc khói.
    - Robot: Khung vỏ hợp kim sứ trắng bo tròn, màn hình OLED gương hiển thị mắt cảm xúc Cyan, ăng-ten phát sóng nhấp nháy.
    - Ghost / Mystery / Thief: Thiết kế áo choàng lượn sóng, mặt nạ dạ hội mạ vàng, khăn rằn ninja bay phấp phới.
  - **Architectural Interior Design:**
    - Hệ vách tiêu âm 28 lam gỗ sồi (Acoustic Oak Slats) chạy dọc tường sau cùng dải đèn LED hắt chân tường ấm cúng (`#f59e0b`).
    - Sàn gỗ óc chó Parquet xương cá sang trọng với độ bóng phản xạ ánh sáng chân thực.
    - Bàn làm việc gỗ nguyên tấm (Live-edge Walnut) kết hợp chân thép sơn tĩnh điện đen mờ, màn hình cong Ultrawide tràn viền có đèn nền bias lighting, bàn phím cơ và chuột công thái học.
    - Ghế công thái học Ergonomic Chair với chân sao mạ chrome 5 bánh, trụ nâng thủy lực và lưới đỡ thắt lưng.
    - Khu vực Lounge cao cấp: Sofa Scandinavian đệm vải bouclé cao cấp, bàn trà lồng đôi (đá cẩm thạch trắng Carrara + kính màu khói viền đồng thau), ly cà phê gốm thủ công, chậu cây trầu bà lá xẻ (Monstera Deliciosa) với cành lá uốn lượn tự nhiên, TV khung tranh OLED "The Frame".
    - Kệ sách kiến trúc mở với dải LED hắt từng tầng, tượng decor hình vành khuyên kim loại mạ vàng, bình gốm cắm cành hoa khô.
  - **Character Kinematics & Expressive Actions Engine Calibration: PASS**
    - **Mixamo Bone Coordinate Alignment:** Hiệu chỉnh chính xác hệ trục quay góc Euler cho toàn bộ xương armature (vai, cánh tay, cẳng tay, hông, cột sống, đầu):
      - Trục Z chuẩn Mixamo: Z âm (leftArm) / Z dương (rightArm) hạ tay áp sát thân mình khi nghỉ (idle rest: `[0, 0, -1.2]` và `[0, 0, 1.2]`), loại bỏ triệt để lỗi tay bị dang ngang hình chữ T (T-pose).
      - Trục Y chuẩn Yaw: Đưa cánh tay vươn về phía trước ngực và bắt tay (`[0, 1.2, 0.35]`).
      - Trục X chuẩn Pitch: Cúi gập thân người và nghiêng đầu biểu cảm.
    - **Natural Seating Posture:** Tư thế ngồi ghế làm việc / sofa / ngồi bệt được căn chỉnh tự nhiên:
      - Hông hạ xuống cao độ chuẩn mặt ghế (`y = 58cm`), đùi gập ngang 90° (`leftUpLeg`/`rightUpLeg`), cẳng chân hạ thẳng vuông góc (`leftLeg`/`rightLeg`), hai bàn chân chạm sàn vững vàng (`y = 0.05m`).
      - Hai cánh tay gập nhẹ xuôi theo đùi, cẳng tay đặt êm ái trên đùi (`leftArm: [0, -0.3, -1.1]`, `leftForeArm: [0, -0.6, 0.4]`).
    - **Skeletal Clip Blending:** Tận dụng trực tiếp các clip animation mocap gốc của Mixamo (`agree`, `headShake`, `sneak_pose`, `idle`, `walk`, `run`) cho các hành động gật đầu đồng ý (`nod_approval`, `discuss_architecture`), lắc đầu suy tư (`think_ponder`), rón rén lén lút (`sneak_crouch`, `inspect_vault`).
    - **Action Props Scaled & Attached:** Cốc cà phê sứ, điện thoại smartphone tích hợp đèn flash nhấp nháy phát quang, tập hồ sơ CV ứng viên, tia quét laser màu đỏ được định vị chuẩn xác vào lòng bàn tay và kính thực tế ảo của nhân vật.
  - Production Deployment on GitHub Pages: `https://mrnvdong.github.io/the-room/`.

## Content Integrity

All personal credentials, employment histories, and contact info use clearly indicated sample demo data. No frontend secrets.
