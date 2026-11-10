import { IdentityConfig, VisitorIdentity } from '@/types';

export const VISITOR_IDENTITIES: Record<VisitorIdentity, IdentityConfig> = {
  recruiter: {
    id: 'recruiter',
    nameEn: 'Recruiter / Hiring Manager',
    nameVi: 'Nhà tuyển dụng',
    taglineEn: 'Seeking high-impact engineering talent and leadership',
    taglineVi: 'Tìm kiếm nhân tài kỹ thuật và năng lực triển khai',
    descriptionEn: 'Evaluating technical depth, past projects, leadership, and production track records.',
    descriptionVi: 'Đánh giá năng lực kỹ thuật, dự án đã triển khai và kinh nghiệm thực chiến.',
    avatarConcept: 'Professional with business suit & executive briefcase',
    primaryColor: '#1e3a8a', // Dark Navy
    accentColor: '#ef4444', // Red Tie Accent
    badge: '💼',
  },
  partner: {
    id: 'partner',
    nameEn: 'Technical Partner / Client',
    nameVi: 'Đối tác công nghệ',
    taglineEn: 'Exploring strategic synergies and engineering collaboration',
    taglineVi: 'Khám phá cơ hội hợp tác và kiến trúc giải pháp',
    descriptionEn: 'Focusing on distributed architecture, scalability, product design, and collaboration potential.',
    descriptionVi: 'Quan tâm đến kiến trúc phân tán, khả năng mở rộng và mô hình hợp tác dự án.',
    avatarConcept: 'Tech innovator with modern jacket & digital tablet',
    primaryColor: '#065f46', // Emerald
    accentColor: '#34d399', // Bright Mint
    badge: '🤝',
  },
  friend: {
    id: 'friend',
    nameEn: 'Close Friend',
    nameVi: 'Bạn bè thân thiết',
    taglineEn: 'Dropping by for fun, casual chats and cool hacks',
    taglineVi: 'Ghé chơi, tâm sự và xem các dự án thú vị',
    descriptionEn: 'Unfiltered access to behind-the-scenes stories, engineering jokes, and coffee habits.',
    descriptionVi: 'Xem chuyện hậu trường, chuyện phiếm công nghệ và góc làm việc đời thường.',
    avatarConcept: 'Casual buddy with relaxed hoodie & sneakers',
    primaryColor: '#d97706', // Warm Amber
    accentColor: '#fbbf24', // Gold
    badge: '☕',
  },
  visitor: {
    id: 'visitor',
    nameEn: 'General Visitor / Explorer',
    nameVi: 'Khách tham quan',
    taglineEn: 'Curious explorer discovering an interactive 3D portfolio',
    taglineVi: 'Khám phá không gian làm việc số và danh mục dự án',
    descriptionEn: 'Take a self-paced guided tour through the 3D studio and discover owner creations.',
    descriptionVi: 'Tự do dạo quanh phòng 3D, tìm hiểu sản phẩm và trải nghiệm tương tác.',
    avatarConcept: 'Metaverse Cyber Explorer with VR Headset & Holographic Bodysuit',
    primaryColor: '#0284c7', // Sky Blue
    accentColor: '#38bdf8', // Light Cyan
    badge: '🧭',
  },
  thief: {
    id: 'thief',
    nameEn: 'Stealth Thief / Code Ninja',
    nameVi: 'Kẻ trộm bí ẩn',
    taglineEn: 'Hunting for hidden Easter eggs and demo drawer puzzles',
    taglineVi: 'Tìm kiếm ngăn kéo bí mật và các Easter egg ẩn',
    descriptionEn: 'Explores playful camera reactions, drawer puzzles, and terminal clues.',
    descriptionVi: 'Lén lút tránh camera giám sát, tò mò thử mở các ngăn kéo bị khóa.',
    avatarConcept: 'Masked stealth operative with ninja headband',
    primaryColor: '#0f172a', // Stealth Slate Black
    accentColor: '#e11d48', // Crimson Red
    badge: '🥷',
  },
  ghost: {
    id: 'ghost',
    nameEn: 'Floating Ghost / Phantom',
    nameVi: 'Hồn ma công nghệ',
    taglineEn: 'Ethereal spirit floating gracefully through the digital ether',
    taglineVi: 'Linh hồn lơ lửng, bay lượn nhẹ nhàng trong không gian số',
    descriptionEn: 'Floats weightlessly above the ground with translucent spectral glow.',
    descriptionVi: 'Bay bổng không chạm đất với hiệu ứng ánh sáng quang phổ trong suốt.',
    avatarConcept: 'Translucent glowing phantom with spectral wave trail',
    primaryColor: '#0891b2', // Spectral Cyan
    accentColor: '#a5f3fc', // Ghost Glow
    badge: '👻',
  },
  robot: {
    id: 'robot',
    nameEn: 'Cybernetic Android / Robot',
    nameVi: 'Người máy thông minh',
    taglineEn: 'Autonomous unit analyzing system telemetry and codebases',
    taglineVi: 'Cỗ máy phân tích dữ liệu và kiến trúc hệ thống',
    descriptionEn: 'Equipped with scanner visors, telemetry antenna, and high-precision sensor rigs.',
    descriptionVi: 'Trang bị ăng-ten cảm biến, kính quét laser và giao diện máy học.',
    avatarConcept: 'Compact futuristic mech with antenna & LED visor',
    primaryColor: '#475569', // Chrome Steel
    accentColor: '#22d3ee', // Laser Cyan
    badge: '🤖',
  },
  mystery: {
    id: 'mystery',
    nameEn: 'Mystery Guest',
    nameVi: 'Người bí ẩn',
    taglineEn: 'Incognito visitor shrouded in deep cloak and shadows',
    taglineVi: 'Vị khách ẩn danh trong chiếc áo choàng bóng tối',
    descriptionEn: 'Anonymous identity preserving full privacy while exploring the portfolio.',
    descriptionVi: 'Giữ bí mật danh tính tuyệt đối khi tham quan toàn bộ không gian.',
    avatarConcept: 'Hooded cloaked traveler with glowing shadow eyes',
    primaryColor: '#581c87', // Deep Violet
    accentColor: '#c084fc', // Neon Purple
    badge: '🎭',
  },
};

export const IDENTITY_LIST = Object.values(VISITOR_IDENTITIES);
