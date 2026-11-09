export type VisitorIdentity =
  | 'recruiter'
  | 'partner'
  | 'friend'
  | 'visitor'
  | 'thief'
  | 'ghost'
  | 'robot'
  | 'mystery';

export type GameState =
  | 'BOOT'
  | 'INTRO'
  | 'IDENTIFICATION'
  | 'AVATAR_SELECTION'
  | 'ENTERING'
  | 'EXPLORING'
  | 'INTERACTING'
  | 'CONTENT_VIEW'
  | 'EXITING'
  | 'ERROR';

export interface IdentityConfig {
  id: VisitorIdentity;
  nameEn: string;
  nameVi: string;
  taglineEn: string;
  taglineVi: string;
  descriptionEn: string;
  descriptionVi: string;
  avatarConcept: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
}

export interface VisitorSession {
  sessionId: string;
  nickname: string;
  identity: VisitorIdentity;
  startedAt: string;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  language: 'en' | 'vi';
}

export interface BoundingBox3D {
  id: string;
  min: [number, number, number];
  max: [number, number, number];
}

export interface InteractableObject {
  id: string;
  displayName: string;
  description?: string;
  position: [number, number, number];
  radius: number;
  action: string;
  category?: 'desk' | 'projects' | 'books' | 'achievements' | 'servers' | 'lounge' | 'window' | 'exit' | 'entrance';
}

export type QualityPreset = 'low' | 'medium' | 'high';
