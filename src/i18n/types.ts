export type Language = 'en' | 'vi';

export interface TranslationDictionary {
  // Common & Navigation
  workspaceTitle: string;
  tagline: string;
  close: string;
  back: string;
  enterRoom: string;
  skipCinematic: string;
  connecting: string;
  onlineVisitors: string;
  language: string;
  twoDMode: string;
  threeDMode: string;

  // Entrance
  corridorTitle: string;
  doorbellHint: string;
  cameraHint: string;
  nicknamePlaceholder: string;
  nicknameLabel: string;
  selectRole: string;
  charLimit: string;

  // Roles
  roleRecruiter: string;
  rolePartner: string;
  roleFriend: string;
  roleVisitor: string;
  roleThief: string;
  roleGhost: string;
  roleRobot: string;
  roleMystery: string;

  // Welcome banners based on role
  welcomeRecruiter: string;
  welcomePartner: string;
  welcomeFriend: string;
  welcomeDefault: string;

  // Interactions
  interactPrompt: string;
  tapToInteract: string;
  lookoutModeActive: string;
  exitLookout: string;
  relaxingOnSofa: string;
  standUp: string;
  deskLampToggled: string;

  // Panels
  desktopTitle: string;
  terminalTitle: string;
  bookshelfTitle: string;
  projectsTitle: string;
  serversTitle: string;
  secretDrawerTitle: string;
  contactTitle: string;
  faqTitle: string;
  windowTitle: string;
  coffeeTitle: string;

  // 2D Portfolio View
  viewProjects: string;
  viewSkills: string;
  viewExperience: string;
  viewContact: string;
  sampleDataNotice: string;
}
