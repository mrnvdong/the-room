# THE ROOM — System Architecture

> **Implementation status:** The 3D client and local Vite WebSocket/API demonstration exist. Cloudflare Workers/Pages Functions, D1 persistence, production authentication, and production multiplayer are not implemented. The diagrams and backend sections below describe planned architecture where noted, not deployed infrastructure.

## 1. Architectural Overview
THE ROOM is an interactive 3D web game portfolio experience built with React, Three.js (React Three Fiber & Drei), Zustand, and Tailwind CSS. It follows a clean separation of concerns:
- **Presentation / 3D Scene (`src/game/`)**: Pure Three.js / R3F components for geometry, lighting, character, camera, and environment.
- **Game State & Control (`src/stores/`, `src/game/controls/`)**: Decoupled Zustand stores managing visitor identity, game mode, exploration progress, player inputs, and active interactions.
- **Real-Time Multi-Visitor Presence (`src/features/multiplayer/`, `src/stores/useMultiplayerStore.ts`)**: Real-time peer synchronization broadcasting player positions, movement states, facing angles, and presence events.
- **UI & HUD Overlay (`src/components/`)**: Minimalistic, responsive, accessible Tailwind CSS overlays (HUD, modals, virtual desktop, mobile touch controls, live online visitor counter, join/leave toasts).
- **Content & Domain Model (`src/features/portfolio/`)**: Type-safe data providers delivering structured portfolio information with Vietnamese and English localization, separated from 3D logic.

```
                  ┌──────────────────────────────────────────────┐
                  │                 Browser DOM                  │
                  │   ┌──────────────────┐  ┌────────────────┐   │
                  │   │  Tailwind HUD &  │  │ Accessibility  │   │
                  │   │  Multiplayer     │  │ Fallback View  │   │
                  │   │  Presence Toast  │  │                │   │
                  │   └────────▲─────────┘  └───────▲────────┘   │
                  └────────────┼────────────────────┼────────────┘
                               │                    │
                  ┌────────────▼────────────────────▼────────────┐
                  │          Zustand Application Stores          │
                  │  (gameStore, inputStore, multiplayerStore)   │
                  └────────────▲────────────────────▲────────────┘
                               │                    │
        ┌──────────────────────┼────────────────────┼────────┐
        │           R3F / Three.js                  │        │
        │  ┌──────────────┐  ┌────────────┐         │        │
        │  │ Third-Person │  │  Collider  │         ▼        │
        │  │ Follow Camera│  │ & Physics  │ ┌────────────────┐
        │  └──────▲───────┘  └─────▲──────┘ │BroadcastChannel│
        │         │                │        │/ Peer Sync     │
        │  ┌──────┴────────────────┴──────┐ └───────▲────────┘
        │  │     Avatar / Character       │         │
        │  └──────────────▲───────────────┘         │
        │                 │                         │
        │  ┌──────────────┴───────────────┐         │
        │  │   Remote Players Container   │◄────────┘
        │  │ (Co-visitors 3D Nametags)    │
        │  └──────────────▲───────────────┘
        │                 │
        │  ┌──────────────┴───────────────┐
        │  │ Room Shell & Furniture Props │
        │  └──────────────────────────────┘
        └─────────────────────────────────┘
```

## 2. Real-Time Multi-Visitor Synchronization System
1. **Presence Engine (`src/features/multiplayer/MultiplayerSync.tsx`)**:
   - Transmits local player coordinates, rotation, movement flags, nickname, and identity archetype.
   - Frequency: ~25Hz during movement, periodic heartbeats every 1.5s.
   - PING discovery: when a new tab/visitor enters, active clients immediately reply with their latest transform so the newcomer sees all active co-visitors in the room immediately.
2. **3D Remote Player Representation (`src/game/characters/RemotePlayer.tsx`)**:
   - Renders each co-visitor using their assigned `AvatarModel` (Recruiter with suit/briefcase, Partner with tablet, Robot with antenna/visors, Ghost with spectral tail, etc.).
   - Exponential smoothing (`currentPos.lerp(targetPos)`) ensures fluid movement without stutter.
   - Displays a floating 3D billboard nametag with role icon, visitor nickname, and Vietnamese role label.
3. **Presence UI & Counter (`src/components/hud/MultiplayerBadge.tsx`)**:
   - Real-time online counter: "🟢 3 Visitors in Room".
   - Toast notification alerts on join/leave.
   - Built-in "+ Co-visitor" simulator button for instant single-window testing.
