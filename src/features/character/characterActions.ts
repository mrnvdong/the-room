import { VisitorIdentity } from '@/types';

export type CharacterActionId =
  // Universal
  | 'wave'
  | 'applause'
  | 'sit'
  | 'laugh'
  | 'dance'
  // Recruiter
  | 'handshake'
  | 'inspect_cv'
  | 'nod_approval'
  | 'adjust_tie'
  // Technical Partner
  | 'type_device'
  | 'discuss_architecture'
  | 'think_ponder'
  // Close Friend
  | 'high_five'
  | 'drink_coffee'
  | 'cheer'
  // General Visitor / Explorer
  | 'look_around'
  | 'take_photo'
  // Stealth Thief
  | 'sneak_crouch'
  | 'inspect_vault'
  | 'blend_in'
  // Floating Ghost
  | 'spooky_boo'
  | 'twirl_float'
  // Cybernetic Bot
  | 'laser_scan'
  | 'robot_dance'
  | 'recharge'
  // Mystery Guest
  | 'mysterious_bow'
  | 'snap_fingers';

export interface CharacterActionDef {
  id: CharacterActionId;
  labelVi: string;
  labelEn: string;
  emoji: string;
  durationMs: number;
  descriptionVi: string;
  descriptionEn: string;
  forIdentities?: VisitorIdentity[]; // undefined = universal
}

export const CHARACTER_ACTIONS: Record<CharacterActionId, CharacterActionDef> = {
  // Universal
  wave: {
    id: 'wave',
    labelVi: 'Vẫy tay chào',
    labelEn: 'Wave Hello',
    emoji: '👋',
    durationMs: 3500,
    descriptionVi: 'Vẫy tay nhiệt tình chào mọi người trong phòng',
    descriptionEn: 'Enthusiastically wave to everyone in the workspace',
  },
  applause: {
    id: 'applause',
    labelVi: 'Vỗ tay khen ngợi',
    labelEn: 'Applause',
    emoji: '👏',
    durationMs: 4000,
    descriptionVi: 'Vỗ tay tán thưởng dự án và kiến trúc',
    descriptionEn: 'Applaud impressive architectural achievements',
  },
  sit: {
    id: 'sit',
    labelVi: 'Ngồi / Đứng dậy',
    labelEn: 'Sit / Stand',
    emoji: '🪑',
    durationMs: 0, // toggle
    descriptionVi: 'Ngồi xuống ghế làm việc, sofa hoặc ngồi nghỉ thư giãn',
    descriptionEn: 'Sit down on an ergonomic chair, sofa or floor lounge',
  },
  laugh: {
    id: 'laugh',
    labelVi: 'Cười vui vẻ',
    labelEn: 'Laugh',
    emoji: '😄',
    durationMs: 3500,
    descriptionVi: 'Cười thoải mái cùng đồng nghiệp',
    descriptionEn: 'Share a good laugh with colleagues',
  },
  dance: {
    id: 'dance',
    labelVi: 'Nhảy ăn mừng',
    labelEn: 'Celebration Dance',
    emoji: '🕺',
    durationMs: 5000,
    descriptionVi: 'Nhảy múa mừng release tính năng thành công',
    descriptionEn: 'Dance to celebrate a successful deployment',
  },

  // Recruiter
  handshake: {
    id: 'handshake',
    labelVi: 'Bắt tay phỏng vấn',
    labelEn: 'Executive Handshake',
    emoji: '🤝',
    durationMs: 4000,
    descriptionVi: 'Bắt tay đối tác trang trọng chuẩn phong thái tuyển dụng',
    descriptionEn: 'Formal executive handshake welcoming a candidate',
    forIdentities: ['recruiter'],
  },
  inspect_cv: {
    id: 'inspect_cv',
    labelVi: 'Soi xét hồ sơ CV',
    labelEn: 'Review CV Dossier',
    emoji: '📋',
    durationMs: 5000,
    descriptionVi: 'Mở tập hồ sơ ứng viên và xem xét kỹ lưỡng kinh nghiệm',
    descriptionEn: 'Inspect candidate portfolio and credentials carefully',
    forIdentities: ['recruiter'],
  },
  nod_approval: {
    id: 'nod_approval',
    labelVi: 'Gật đầu duyệt hồ sơ',
    labelEn: 'Nod Approval',
    emoji: '👍',
    durationMs: 3500,
    descriptionVi: 'Gật đầu hài lòng đánh giá cao ứng viên',
    descriptionEn: 'Nod with high satisfaction regarding technical depth',
    forIdentities: ['recruiter'],
  },
  adjust_tie: {
    id: 'adjust_tie',
    labelVi: 'Chỉnh lại cà vạt',
    labelEn: 'Straighten Tie',
    emoji: '👔',
    durationMs: 3000,
    descriptionVi: 'Chỉnh trang cổ áo và cà vạt chuẩn bị phỏng vấn',
    descriptionEn: 'Straighten executive tie and suit collar',
    forIdentities: ['recruiter'],
  },

  // Technical Partner
  type_device: {
    id: 'type_device',
    labelVi: 'Gõ phím / Live Code',
    labelEn: 'Live Code on Device',
    emoji: '💻',
    durationMs: 4500,
    descriptionVi: 'Mở tablet phát sáng và gõ lệnh kiểm tra hệ thống',
    descriptionEn: 'Tap away on digital tablet running system diagnostics',
    forIdentities: ['partner'],
  },
  discuss_architecture: {
    id: 'discuss_architecture',
    labelVi: 'Tranh luận kiến trúc',
    labelEn: 'Debate Architecture',
    emoji: '📐',
    durationMs: 5000,
    descriptionVi: 'Chỉ trỏ phân tích cấu trúc Cloud Edge và Microservices',
    descriptionEn: 'Gesture expressively breaking down distributed architecture',
    forIdentities: ['partner'],
  },
  think_ponder: {
    id: 'think_ponder',
    labelVi: 'Khoanh tay suy ngẫm',
    labelEn: 'Ponder Solution',
    emoji: '🤔',
    durationMs: 4000,
    descriptionVi: 'Khoanh tay chống cằm đăm chiêu tìm giải pháp tối ưu',
    descriptionEn: 'Cross arms with hand on chin evaluating architectural trade-offs',
    forIdentities: ['partner'],
  },

  // Close Friend
  high_five: {
    id: 'high_five',
    labelVi: 'Đập tay High-Five',
    labelEn: 'High-Five!',
    emoji: '✋',
    durationMs: 3500,
    descriptionVi: 'Giơ tay đập tay ăn ý với bạn thân',
    descriptionEn: 'Give an energetic high-five to a close friend',
    forIdentities: ['friend'],
  },
  drink_coffee: {
    id: 'drink_coffee',
    labelVi: 'Nhâm nhi cà phê',
    labelEn: 'Sip Dark Roast',
    emoji: '☕',
    durationMs: 4500,
    descriptionVi: 'Cầm tách cà phê nóng nhấp một ngụm thư giãn',
    descriptionEn: 'Sip freshly brewed coffee while soaking in the ambiance',
    forIdentities: ['friend'],
  },
  cheer: {
    id: 'cheer',
    labelVi: 'Thả tim cổ vũ',
    labelEn: 'Cheer & Heart',
    emoji: '❤️',
    durationMs: 3500,
    descriptionVi: 'Tung lời khen và cổ vũ nhiệt thành',
    descriptionEn: 'Send encouraging energy and warm heart vibes',
    forIdentities: ['friend'],
  },

  // General Visitor / Explorer
  look_around: {
    id: 'look_around',
    labelVi: 'Ngó nghiêng quan sát',
    labelEn: 'Look Around',
    emoji: '🧭',
    durationMs: 4000,
    descriptionVi: 'Đưa tay che trán quan sát toàn cảnh phòng làm việc',
    descriptionEn: 'Scan the skyline views and sleek interior details',
    forIdentities: ['visitor'],
  },
  take_photo: {
    id: 'take_photo',
    labelVi: 'Rút điện thoại chụp ảnh',
    labelEn: 'Snap Photo',
    emoji: '📸',
    durationMs: 3500,
    descriptionVi: 'Giơ smartphone chụp góc phòng đẹp với hiệu ứng flash',
    descriptionEn: 'Raise smartphone and trigger a camera flash photo',
    forIdentities: ['visitor'],
  },

  // Stealth Thief
  sneak_crouch: {
    id: 'sneak_crouch',
    labelVi: 'Rón rén rình mò',
    labelEn: 'Sneak Crouch',
    emoji: '🥷',
    durationMs: 4500,
    descriptionVi: 'Hạ thấp người di chuyển rón rén không phát ra tiếng động',
    descriptionEn: 'Drop into a stealth crouch moving silently across the floor',
    forIdentities: ['thief'],
  },
  inspect_vault: {
    id: 'inspect_vault',
    labelVi: 'Dòm ngó két sắt',
    labelEn: 'Scope Safe Drawer',
    emoji: '🔍',
    durationMs: 4000,
    descriptionVi: 'Soi ổ khoá bàn làm việc tìm mật mã bí mật',
    descriptionEn: 'Carefully examine locks and keypad combination drawers',
    forIdentities: ['thief'],
  },
  blend_in: {
    id: 'blend_in',
    labelVi: 'Suỵt khẽ ẩn thân',
    labelEn: 'Shh / Blend In',
    emoji: '🤫',
    durationMs: 3500,
    descriptionVi: 'Đưa ngón tay lên miệng suỵt khẽ nép mình vào bóng tối',
    descriptionEn: 'Put finger to mask shushing quietly and blending into shadow',
    forIdentities: ['thief'],
  },

  // Floating Ghost
  spooky_boo: {
    id: 'spooky_boo',
    labelVi: 'Hù dọa ma mị',
    labelEn: 'Spooky Boo!',
    emoji: '👻',
    durationMs: 4000,
    descriptionVi: 'Vươn tay uốn lượn hù dọa với ánh hào quang lập lòe',
    descriptionEn: 'Ethereal arms undulate with a shimmering spectral glow',
    forIdentities: ['ghost'],
  },
  twirl_float: {
    id: 'twirl_float',
    labelVi: 'Xoay tròn trên không',
    labelEn: 'Twirl Float',
    emoji: '🌀',
    durationMs: 4500,
    descriptionVi: 'Bay bổng lên cao rồi xoay tít 360 độ trên không gian',
    descriptionEn: 'Float upwards and spin smoothly in 360 degrees mid-air',
    forIdentities: ['ghost'],
  },

  // Cybernetic Bot
  laser_scan: {
    id: 'laser_scan',
    labelVi: 'Quét Laser phân tích',
    labelEn: 'Laser Sensor Scan',
    emoji: '🔴',
    durationMs: 4000,
    descriptionVi: 'Chiếu chùm tia laser cảm biến quét phân tích khắp phòng',
    descriptionEn: 'Project glowing laser scan beams analyzing room geometry',
    forIdentities: ['robot'],
  },
  robot_dance: {
    id: 'robot_dance',
    labelVi: 'Điệu nhảy Glitch Robot',
    labelEn: 'Robot Dance Glitch',
    emoji: '🤖',
    durationMs: 4500,
    descriptionVi: 'Chuyển động giật góc 90 độ chuẩn phong cách Cyberpunk',
    descriptionEn: 'Perform snappy 90-degree robotic dance steps',
    forIdentities: ['robot'],
  },
  recharge: {
    id: 'recharge',
    labelVi: 'Tự sạc năng lượng',
    labelEn: 'Self Recharge',
    emoji: '🔋',
    durationMs: 4000,
    descriptionVi: 'Đứng nghiêm, đèn LED nhấp nháy sạc đầy pin hệ thống',
    descriptionEn: 'Enter standby mode pulsing LED beacons to top off energy',
    forIdentities: ['robot'],
  },

  // Mystery Guest
  mysterious_bow: {
    id: 'mysterious_bow',
    labelVi: 'Cúi chào quý tộc',
    labelEn: 'Noble Mystery Bow',
    emoji: '🎩',
    durationMs: 4000,
    descriptionVi: 'Một tay trước ngực, một tay sau lưng cúi chào tao nhã',
    descriptionEn: 'Bow gracefully from the waist in aristocratic shadow',
    forIdentities: ['mystery'],
  },
  snap_fingers: {
    id: 'snap_fingers',
    labelVi: 'Búng tay ma thuật',
    labelEn: 'Magic Finger Snap',
    emoji: '🫰',
    durationMs: 3500,
    descriptionVi: 'Búng tay phát ra chùm tia sáng tím huyền bí',
    descriptionEn: 'Snap fingers conjuring a burst of arcane purple sparks',
    forIdentities: ['mystery'],
  },
};

export const getActionsForIdentity = (
  identity: VisitorIdentity
): CharacterActionDef[] => {
  const universal = Object.values(CHARACTER_ACTIONS).filter(
    (a) => !a.forIdentities
  );
  const signature = Object.values(CHARACTER_ACTIONS).filter(
    (a) => a.forIdentities?.includes(identity)
  );
  return [...signature, ...universal];
};

export const PRESET_CHAT_MESSAGES = [
  { textVi: '👋 Chào mọi người!', textEn: '👋 Hello everyone!' },
  { textVi: '🤝 Rất vui được gặp bạn!', textEn: '🤝 Great to meet you!' },
  { textVi: '💼 Mình cùng xem qua hồ sơ nhé!', textEn: "💼 Let's review the CV dossier!" },
  { textVi: '💻 Kiến trúc Cloud Edge đỉnh quá!', textEn: '💻 Impressive Cloud Edge setup!' },
  { textVi: '☕ Thưởng thức cà phê thư giãn nào!', textEn: "☕ Enjoying a hot cup of coffee!" },
  { textVi: '🪑 Ngồi xuống ghế trò chuyện chút!', textEn: "🪑 Let's sit down and chat!" },
  { textVi: '👏 Dự án được thiết kế rất chỉn chu!', textEn: '👏 Very slick project design!' },
];
