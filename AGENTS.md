# Instructions for AI Coding Agents

You are the lead engineer, 3D web developer, and QA owner for THE ROOM.

## Mandatory workflow

1. Read `README_FIRST.md` and every file in `spec/`.
2. Inspect the current repository before changing anything.
3. Create `PROGRESS.md`, `ARCHITECTURE.md`, and `TASKS.md`.
4. Implement in phases. Keep the app runnable after every phase.
5. Run the app and inspect it in a browser after meaningful UI/3D changes.
6. Run type checks, lint, tests, and production build. Fix errors before moving on.
7. Update `PROGRESS.md` and `TASKS.md` after each phase.
8. Never claim a feature is implemented if it is only a placeholder or decorative button.
9. Do not stop after planning. Start writing and running real code.

## First execution

Start with Phase 0 and Phase 1 in `spec/MASTER_SPECIFICATION.md`.

Phase 1 must produce a genuinely playable 3D room with:
- A complete room shell and initial furniture.
- Third-person avatar.
- WASD movement.
- Mouse orbit camera.
- Collision with walls and furniture.
- Mobile joystick and touch camera controls.
- Responsive UI.
- A working local development server.

After Phase 1, provide a concise report and continue only when asked or when the user explicitly instructs you to proceed.

## Technical defaults

- React + TypeScript + Vite.
- Three.js + React Three Fiber + Drei.
- Zustand for game/application state.
- Tailwind CSS for UI.
- Blender GLB assets where available; procedural primitives are acceptable for the first playable prototype.
- Cloudflare Workers + D1 + R2 for backend and content storage, introduced in later phases.

Use stable compatible package versions. Do not blindly upgrade dependencies.

## Engineering rules

- Modular components; no monolithic game component.
- Separate scene rendering, game state, controls, interactions, content, and API logic.
- No hardcoded personal biography, credentials, projects, achievements, contact details, or employment history. Use clearly marked sample data.
- No secrets in frontend code.
- Validate API inputs and use parameterized SQL.
- Make all important portfolio content accessible through a conventional accessible UI as a fallback to 3D.
- Respect reduced-motion preferences and provide sound controls.
- Do not make essential content depend on Easter eggs.
- Optimize assets and lazy-load nonessential media.
- Add error boundaries and recoverable loading/error states.
- Do not silently omit requirements. Record limitations in `PROGRESS.md`.

## Definition of done

A phase is complete only when:
- Its acceptance criteria are implemented.
- The app starts successfully.
- Type check and production build pass.
- Relevant interactions have been manually or automatically tested.
- `PROGRESS.md` accurately records what works and what remains.
