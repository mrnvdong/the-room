export interface ProjectRecord {
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

export interface BookRecord {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  pages: {
    pageNumber: number;
    title: string;
    content: string;
  }[];
}

export const SAMPLE_PROJECTS: ProjectRecord[] = [
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
    summary: 'Distributed serverless API mesh with sub-15ms worldwide response times utilizing Cloudflare Workers & D1.',
    description: 'A global edge computing pipeline supporting transactional SQLite replication, KV caching, and zero-trust identity verification.',
    problem: 'Centralized cloud region latency degraded mobile experience in Southeast Asia and Europe.',
    solution: 'Designed an edge-first serverless architecture routing database reads to 300+ edge data centers with automated D1 schema migrations.',
    category: 'Cloud Edge',
    technologies: ['Cloudflare Workers', 'Cloudflare D1', 'Cloudflare R2', 'TypeScript', 'Hono'],
    role: 'Cloud Infrastructure Engineer',
    period: '2024 - 2025',
    status: 'completed',
    featured: true,
    isSample: true,
  },
  {
    id: 'project_03',
    title: 'Autonomous Code Refactoring Agent',
    slug: 'autonomous-agent',
    summary: 'Multi-agent orchestration pipeline performing automated static analysis, migration, and check assertions.',
    description: 'An AI-powered development workflow that scans legacy codebases, applies AST modifications, and validates tests in sandboxed execution environments.',
    problem: 'Manual mechanical refactoring across microservices consumed hundreds of engineering hours every sprint.',
    solution: 'Built specialized LLM tool-calling subagents executing deterministic AST transforms and automated regression verification.',
    category: 'AI Systems',
    technologies: ['TypeScript', 'Gemini API', 'Node.js', 'Babel AST', 'Vitest'],
    role: 'AI Systems Engineer',
    period: '2024',
    status: 'completed',
    featured: true,
    isSample: true,
  },
  {
    id: 'project_04',
    title: 'High-Concurrency Telemetry Dashboard',
    slug: 'telemetry-dashboard',
    summary: 'Real-time WebSocket monitoring suite processing 100k events/sec with Canvas visualization.',
    description: 'A high-performance observability dashboard with interactive node topologies, latency histograms, and alert dispatchers.',
    problem: 'Standard DOM table renderers suffered memory leaks and frame drops when streaming continuous IoT telemetry.',
    solution: 'Utilized WebGL canvas rendering, typed array circular buffers, and web worker decoding for zero main-thread blocking.',
    category: 'Full-Stack',
    technologies: ['React', 'WebGL', 'WebSockets', 'Go', 'Redis'],
    role: 'Frontend Systems Specialist',
    period: '2023 - 2024',
    status: 'completed',
    featured: false,
    isSample: true,
  },
];

export const TECHNICAL_BOOKS: BookRecord[] = [
  {
    id: 'book.programming',
    title: 'Clean Architecture & Distributed Systems',
    subtitle: 'Principles of Resilient Software Engineering',
    category: 'Programming & Architecture',
    color: '#ef4444',
    pages: [
      {
        pageNumber: 1,
        title: 'Separation of Concerns',
        content: 'True modularity begins by decoupling business domains from delivery mechanisms. Whether rendering a 3D WebGL scene, an accessible HTML modal, or an edge API, data contracts must remain independent of framework idiosyncrasies.',
      },
      {
        pageNumber: 2,
        title: 'Resilient Error Boundaries',
        content: 'Fault tolerance requires assuming that external services, asset downloads, and network connections will periodically fail. Graceful degradation and zero-state fallbacks must be first-class citizens in every system.',
      },
      {
        pageNumber: 3,
        title: 'Pragmatic Engineering',
        content: 'Avoid premature optimization, but never compromise on sound data modeling. A clean schema and deterministic state transitions make complex applications predictable and maintainable.',
      },
    ],
  },
  {
    id: 'book.web',
    title: 'Modern Full-Stack & Spatial 3D Web',
    subtitle: 'From View Transitions to WebGL Shaders',
    category: 'Web & 3D Graphics',
    color: '#3b82f6',
    pages: [
      {
        pageNumber: 1,
        title: 'The Spatial Web Paradigm',
        content: 'Websites no longer need to be vertical documents of text. By integrating spatial computing, physics, and interactive 3D assets directly into browser runtimes, portfolios transform into memorable experiences.',
      },
      {
        pageNumber: 2,
        title: 'Rendering Optimization',
        content: 'Balancing visual fidelity with 60 FPS performance demands strict asset budgeting: geometry instancing, texture atlas sharing, low-poly stylized geometry, and disciplined draw call management.',
      },
      {
        pageNumber: 3,
        title: 'Progressive Enhancement',
        content: 'A 3D interface must never leave visitors stranded. Providing keyboard navigation, screen reader accessibility, and conventional 2D fallbacks ensures every user enjoys full access to essential portfolio content.',
      },
    ],
  },
  {
    id: 'book.cloud',
    title: 'Serverless Edge & Cloud Infrastructure',
    subtitle: 'Building for Zero Latency with Cloudflare',
    category: 'Cloud Infrastructure',
    color: '#f97316',
    pages: [
      {
        pageNumber: 1,
        title: 'Global Edge Compute',
        content: 'Executing serverless functions directly on edge nodes within milliseconds of end visitors eliminates origin round-trips and revolutionizes web responsiveness worldwide.',
      },
      {
        pageNumber: 2,
        title: 'Edge Databases with D1',
        content: 'Distributed SQL query execution with automatic read replication brings transactional relational schemas into the serverless era without managing physical database instances.',
      },
    ],
  },
  {
    id: 'book.ai',
    title: 'Autonomous AI Agents & Tool Calling',
    subtitle: 'Architectures for Deterministic Multi-Agent Systems',
    category: 'AI & Automation',
    color: '#a855f7',
    pages: [
      {
        pageNumber: 1,
        title: 'Structured Tool Calling',
        content: 'Autonomous agents thrive when equipped with strictly typed tools, sandboxed execution commands, and clear verification loops rather than unconstrained text generation.',
      },
      {
        pageNumber: 2,
        title: 'Multi-Agent Pair Programming',
        content: 'Specializing agents into researcher, implementer, and QA roles yields higher code quality and eliminates regressions before production deployment.',
      },
    ],
  },
  {
    id: 'book.hardware',
    title: 'Embedded Systems & Edge IoT',
    subtitle: 'Connecting the Physical and Digital Worlds',
    category: 'Hardware & IoT',
    color: '#10b981',
    pages: [
      {
        pageNumber: 1,
        title: 'Real-Time Sensor Telemetry',
        content: 'Interfacing microcontrollers with low-power radio and WebSockets enables seamless physical room interactions and digital twin monitoring.',
      },
    ],
  },
  {
    id: 'book.problem_solving',
    title: 'Engineering Mental Models',
    subtitle: 'Heuristics for Complex Decision Making',
    category: 'Problem Solving',
    color: '#f59e0b',
    pages: [
      {
        pageNumber: 1,
        title: 'First Principles Thinking',
        content: 'Boil systems down to their most fundamental truths: latency, bandwidth, memory, and visitor delight. Build up solutions from there rather than copying convention.',
      },
    ],
  },
];
