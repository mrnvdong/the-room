# THE ROOM task status

## Implemented for local prototype

- [x] React/TypeScript/Vite foundation and modular 3D scene.
- [x] Room, furniture, avatar, keyboard movement, orbit camera, collision, touch controls.
- [x] Entrance, visitor archetypes, object panels, bilingual UI, and 2D view.
- [x] Photorealistic 3D GLB furniture integration (luxury velvet sofa, Sheen designer armchair, biophilic indoor plant, executive workstation desk & chair).
- [x] Professional character archetypes (tailored business suit, silk necktie & gold watch for partner/recruiter; modern tech backpack & apparel for developer).
- [x] Natural sitting kinematics (native Mixamo typing animation at desk, anatomically correct sofa seating, authentic handshake & tie adjustment).
- [x] Local development guestbook and WebSocket presence demonstrations.
- [x] Removed invented contact details and hardcoded client-side admin passwords.
- [x] Admin UI disabled until server-side authentication exists.
- [x] Local guestbook validates input and holds new entries as pending.

## Remaining before production

- [ ] Implement Cloudflare Pages Functions/Worker routes with D1 persistence and migrations.
- [ ] Implement secure admin login, server-side authorization, sessions, and rate limits.
- [ ] Add persistent guestbook moderation and integration tests for unauthorized access.
- [ ] Implement production multiplayer or disable the feature outside development.
- [ ] Replace demo portfolio content with owner-verified information or remove it.
- [ ] Expand E2E assertions for movement, collisions, and real touch input.
- [ ] Reduce initial JS payload through measured code splitting and verify runtime performance.
- [ ] Configure and verify a production deployment; do not mark deployment complete before that.

## Verification rule

Only mark a task complete when its behavior has been exercised and evidence is recorded in `TEST_REPORT.md`. Local mock behavior does not satisfy production backend tasks.
