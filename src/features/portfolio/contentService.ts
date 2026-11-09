export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email' | 'twitter' | 'website';
  label: string;
  url: string;
}

export interface PortfolioProfile {
  displayName: string;
  headline: string;
  shortBio: string;
  biography: string;
  location: string;
  interests: string[];
  socialLinks: SocialLink[];
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  category: 'Full-Stack' | '3D Web' | 'Cloud Edge' | 'AI Systems';
  technologies: string[];
  role: string;
  period: string;
  status: 'active' | 'completed' | 'archived';
  demoUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  isSample: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend & 3D' | 'Backend & Cloud' | 'Systems & Tooling' | 'AI & Automation';
  description: string;
  proficiency?: number;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  relatedProjectIds: string[];
  isSample: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
  isSample: boolean;
}

export const PORTFOLIO_PROFILE: PortfolioProfile = {
  displayName: 'DONG',
  headline: 'Portfolio details not configured',
  shortBio: '',
  biography: 'The owner has not added verified biography or career details yet.',
  location: '',
  interests: [],
  socialLinks: [],
};

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'project_01',
    title: 'THE ROOM — 3D Spatial Portfolio',
    slug: 'the-room-3d',
    summary: 'A portfolio you do not scroll, you explore. Interactive virtual studio built with React Three Fiber.',
    description: 'An interactive 3D web experience presenting an engineering portfolio as a physical creative workspace with multi-visitor presence, obstacle collisions, and rich interactive props.',
    problem: 'Traditional flat 2D portfolio websites fail to showcase spatial computing capabilities, graphics performance, and real-time multiplayer system design.',
    solution: 'Engineered an accessible low-poly 3D environment with procedural rigs, real-time WebSocket peer synchronization, and seamless 2D fallbacks.',
    category: '3D Web',
    technologies: ['React 18', 'Three.js', 'React Three Fiber', 'Zustand', 'Tailwind CSS', 'WebSockets'],
    role: 'Lead Architect & Full-Stack Engineer',
    period: '2025 - Present',
    status: 'active',
    featured: true,
    isSample: true,
  },
  {
    id: 'project_02',
    title: 'Cloudflare Edge Microservices Mesh',
    slug: 'edge-mesh',
    summary: 'Distributed serverless API fabric handling sub-15ms worldwide requests with D1 & R2.',
    description: 'High-throughput globally distributed API platform orchestrating Cloudflare Workers, transactional SQLite with D1, durable caching, and geo-routed WebSocket pub/sub.',
    problem: 'Centralized database servers in single regions cause 200ms+ round-trip latency for global visitors and complicated disaster recovery.',
    solution: 'Designed edge-first data tier using serverless functions deployed to 300+ PoPs with automated replication and read caching.',
    category: 'Cloud Edge',
    technologies: ['Cloudflare Workers', 'D1 SQL', 'Cloudflare R2', 'TypeScript', 'Hono.js', 'Durable Objects'],
    role: 'Cloud Systems Architect',
    period: '2024 - 2025',
    status: 'completed',
    featured: true,
    isSample: true,
  },
  {
    id: 'project_03',
    title: 'Autonomous Code Intelligence Agent',
    slug: 'agentic-ai-flow',
    summary: 'Multi-agent orchestration system for automated test generation and self-healing CI/CD.',
    description: 'Autonomous software engineering agent pipeline capable of static syntax parsing, automated reproduction test authoring, and branch validation.',
    problem: 'Manual regression debugging consumes over 35% of engineering sprint cycles across complex web applications.',
    solution: 'Created an AST-driven test generator with containerized sandbox execution, self-correcting feedback loops, and automated PR reviews.',
    category: 'AI Systems',
    technologies: ['Python', 'TypeScript', 'LLM Tool Calling', 'Docker', 'Tree-Sitter', 'GitHub Actions'],
    role: 'AI Engineer & System Designer',
    period: '2024',
    status: 'completed',
    featured: true,
    isSample: true,
  },
  {
    id: 'project_04',
    title: 'Enterprise Real-Time Analytics Canvas',
    slug: 'realtime-canvas',
    summary: '60 FPS data visualization dashboard streaming millions of concurrent event metrics.',
    description: 'High-density metrics visualization suite combining WebGL canvas rendering, WebSocket streams, and zero-allocation data buffers.',
    problem: 'Standard DOM-based charting components stutter and drop frames when rendering over 50,000 live updating data points.',
    solution: 'Implemented GPU instanced rendering pipeline via PixiJS/Three.js with off-thread Web Workers processing live metrics.',
    category: 'Full-Stack',
    technologies: ['React', 'WebGL', 'WebSockets', 'RxJS', 'Web Workers', 'Tailwind CSS'],
    role: 'Senior Frontend Engineer',
    period: '2023 - 2024',
    status: 'completed',
    featured: true,
    isSample: true,
  },
];

export const PORTFOLIO_SKILLS: SkillItem[] = [
  { id: 'sk_01', name: 'React 18 & Next.js', category: 'Frontend & 3D', description: 'Declarative component architecture, Server Components, and reactive state', proficiency: 95, featured: true },
  { id: 'sk_02', name: 'Three.js & React Three Fiber', category: 'Frontend & 3D', description: 'Spatial 3D graphics, procedural meshes, shaders, and physics collisions', proficiency: 92, featured: true },
  { id: 'sk_03', name: 'TypeScript (Strict)', category: 'Frontend & 3D', description: 'Advanced generic type systems, zero runtime bugs, discriminated unions', proficiency: 98, featured: true },
  { id: 'sk_04', name: 'Tailwind CSS & Web UI', category: 'Frontend & 3D', description: 'Design systems, accessible components (WCAG 2.1), micro-interactions', proficiency: 94, featured: true },
  { id: 'sk_05', name: 'Cloudflare Workers & Edge', category: 'Backend & Cloud', description: 'Serverless microservices, sub-millisecond cold starts, global routing', proficiency: 90, featured: true },
  { id: 'sk_06', name: 'D1 / PostgreSQL / Redis', category: 'Backend & Cloud', description: 'Relational data modeling, ACID transactions, distributed caching', proficiency: 88, featured: true },
  { id: 'sk_07', name: 'WebSockets & WebRTC', category: 'Backend & Cloud', description: 'Bidirectional low-latency real-time multiplayer synchronization', proficiency: 89, featured: true },
  { id: 'sk_08', name: 'CI/CD & DevOps Automation', category: 'Systems & Tooling', description: 'GitHub Actions, automated Playwright E2E suites, Docker pipelines', proficiency: 87, featured: false },
  { id: 'sk_09', name: 'Agentic Workflows & LLMs', category: 'AI & Automation', description: 'Autonomous agent design, structured tool calling, prompt engineering', proficiency: 91, featured: true },
];

export const PORTFOLIO_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp_01',
    organization: 'Spatial Web Labs',
    position: 'Lead 3D & Full-Stack Architect',
    period: '2023 - Present',
    description: 'Directing the architecture of next-generation browser experiences, combining 3D WebGL runtimes with scalable edge backends.',
    achievements: [
      'Architected 3D spatial interactive applications achieving stable 60 FPS on both mobile and desktop hardware.',
      'Reduced median asset load time by 65% through Draco mesh compression and texture streaming.',
      'Mentored engineering teams on strict TypeScript patterns, accessibility, and automated E2E testing.',
    ],
    relatedProjectIds: ['project_01', 'project_04'],
    isSample: true,
  },
  {
    id: 'exp_02',
    organization: 'CloudEdge Global Solutions',
    position: 'Senior Distributed Systems Engineer',
    period: '2021 - 2023',
    description: 'Engineered serverless APIs, global WebSocket networks, and high-availability database replication layers.',
    achievements: [
      'Deployed serverless edge APIs across 300+ PoPs, decreasing global P99 latency from 240ms to 28ms.',
      'Designed transactional database migration pipelines maintaining zero downtime for 10M+ records.',
    ],
    relatedProjectIds: ['project_02'],
    isSample: true,
  },
];

export const PORTFOLIO_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_01',
    title: 'Master of Spatial Secrets',
    description: 'Discovered the hidden keypad on the desk drawer and deciphered the passcode 1337.',
    date: '2026',
    badge: '🏆',
    isSample: true,
  },
  {
    id: 'ach_02',
    title: 'Full-Stack Performance Champion',
    description: 'Awarded for sub-second Lighthouse Core Web Vitals optimization on 3D web applications.',
    date: '2025',
    badge: '⚡',
    isSample: true,
  },
  {
    id: 'ach_03',
    title: 'Open Source Multi-Agent Contributor',
    description: 'Authored tools for automated browser testing and agentic runtime orchestration.',
    date: '2024',
    badge: '🤖',
    isSample: true,
  },
];

export const PORTFOLIO_FAQS = [
  {
    questionEn: 'What is the main engineering focus behind THE ROOM?',
    questionVi: 'Trọng tâm kỹ thuật chính đằng sau THE ROOM là gì?',
    answerEn: 'THE ROOM demonstrates that modern web technology can transcend static 2D documents. By combining React Three Fiber, WebGL optimization, Zustand state management, and real-time WebSocket synchronization, we create an accessible, engaging space that still provides complete 2D accessibility.',
    answerVi: 'THE ROOM chứng minh công nghệ web hiện đại hoàn toàn có thể vượt qua giới hạn của những trang văn bản 2D tĩnh. Bằng cách kết hợp React Three Fiber, tối ưu hóa WebGL, Zustand và WebSocket thời gian thực, chúng ta tạo nên một không gian khám phá hấp dẫn mà vẫn đảm bảo 100% khả năng tiếp cận chuẩn mực 2D.',
  },
  {
    questionEn: 'How do you ensure 60 FPS performance on lower-end devices?',
    questionVi: 'Làm thế nào để bạn đảm bảo hiệu năng 60 FPS trên các thiết bị cấu hình thấp?',
    answerEn: 'We employ aggressive asset budgeting: low-poly stylized procedural geometry, single shared materials, minimal real-time shadow casters, dynamic pixel ratio scaling, and frustum culling. Furthermore, all non-3D users can instantly switch to the full 2D Accessible Portfolio mode.',
    answerVi: 'Chúng tôi áp dụng quản lý tài nguyên nghiêm ngặt: hình học low-poly tối ưu, chia sẻ vật liệu, giảm thiểu nguồn sáng đổ bóng động, tự động co giãn độ phân giải pixel ratio và loại bỏ vật thể ngoài tầm nhìn. Ngoài ra, người dùng luôn có thể chuyển ngay sang bản 2D đầy đủ.',
  },
  {
    questionEn: 'Are you available for freelance projects or full-time roles?',
    questionVi: 'Bạn có sẵn sàng nhận các dự án freelance hoặc vị trí làm việc toàn thời gian không?',
    answerEn: 'Yes! I am open to innovative opportunities in Full-Stack Web Development, 3D Spatial Web, Cloud Edge Architecture, and Autonomous AI systems. Feel free to connect via the Phone contact channel or GitHub.',
    answerVi: 'Có! Tôi luôn sẵn lòng đón nhận các cơ hội hợp tác phát triển Full-Stack, 3D Web không gian, Hạ tầng Cloud Edge và Hệ thống AI. Hãy kết nối qua kênh liên lạc trên điện thoại hoặc GitHub.',
  },
];
