# THE ROOM — Master Development Specification

**Product:** THE ROOM  
**Tagline:** A Portfolio You Don't Scroll. You Explore.  
**Version:** 1.0  
**Type:** Interactive 3D personal portfolio / web game experience

## 1. Product vision

THE ROOM presents a personal portfolio as a virtual workspace. Visitors enter through a door, identify themselves using a nickname and visitor role, receive an avatar, enter the room, and discover the owner's profile, projects, skills, experience, and contact information by interacting with objects.

This must be a functional interactive experience, not a static 3D scene with decorative buttons.

### Product principles
- Exploration-first and non-linear.
- Every major object has a meaningful purpose.
- Visitor identity changes presentation and playful reactions, not real authorization.
- Portfolio content is data-driven and editable without changing 3D source code.
- Desktop and mobile are both first-class.
- Essential portfolio content has an accessible non-3D alternative.
- Performance and graceful degradation are mandatory.

## 2. Default product decisions

| Area | Default |
|---|---|
| Visual style | Stylized 3D, polished moderate low-poly |
| Camera | Third-person follow camera |
| World | One main room plus optional secret room |
| Controls | WASD + mouse; mobile joystick + touch camera |
| Frontend | React, TypeScript, Vite |
| 3D | Three.js, React Three Fiber, Drei |
| State | Zustand |
| UI | Tailwind CSS; Framer Motion for UI transitions |
| Assets | Blender, GLB/glTF |
| Backend | Cloudflare Workers |
| Database | Cloudflare D1 |
| Object storage | Cloudflare R2 |
| Hosting | Cloudflare Pages |
| Languages | Vietnamese and English |

Use current compatible stable versions and document exact versions.

## 3. Application states and visitor journey

Implement an explicit state machine:
1. BOOT
2. INTRO
3. IDENTIFICATION
4. AVATAR_SELECTION
5. ENTERING
6. EXPLORING
7. INTERACTING
8. CONTENT_VIEW
9. EXITING
10. ERROR

Journey:
- Load essential assets and show real loading progress.
- Show the entrance scene.
- Visitor enters an optional nickname (maximum 30 characters).
- Visitor selects one identity.
- Show avatar preview and assigned avatar.
- Play skippable door-opening cinematic.
- Transition to third-person room.
- Show a short controls tutorial.
- Allow free exploration.
- Open object-specific panels.
- Allow contact, guestbook, and exit.

No account registration is required. Do not ask for email or phone at entry. Explain analytics and allow anonymous use.

## 4. Entrance scene

Build a separate 3D corridor/entrance:
- Main door and handle.
- Nameplate: configurable owner name, initially "DONG'S PRIVATE WORKSPACE".
- Doorbell.
- Security camera.
- Welcome sign.
- Floor, walls, ambient lighting and spatial audio.

Interactions:
- Doorbell: animate button and play bell sound.
- Camera: rotate toward visitor, turn on indicator, show playful message.
- Nameplate: display configured owner name.
- Door: remains closed until visitor identification is complete.

## 5. Visitor identities and avatars

Identity options:
| ID | Display name | Avatar concept |
|---|---|---|
| recruiter | Nhà tuyển dụng / Recruiter | Professional with briefcase |
| partner | Đối tác / Partner | Explorer with tablet |
| friend | Bạn bè / Friend | Casual character |
| visitor | Khách tham quan / Visitor | Traveler with camera |
| thief | Kẻ trộm / Thief | Masked ninja |
| ghost | Hồn ma / Ghost | Floating translucent ghost |
| robot | Robot | Compact futuristic robot |
| mystery | Người bí ẩn / Mystery Guest | Hooded character |

All avatars should share a common animation interface:
- Idle
- Walk
- Run
- Interact
- Optional identity-specific idle/emote

Avatar assignment is deterministic by identity. Allow optional cosmetic randomization without changing identity. If dedicated models are unavailable, use a shared rig with distinct accessories/materials.

## 6. Main room geometry and style

Initial proportions:
- Width: 14 world units.
- Depth: 12 world units.
- Height: 4.2 world units.

These are design proportions, not screen pixels.

Style:
- Modern creative workspace.
- Stylized 3D with moderate low-poly detail.
- Dark walnut, warm beige, charcoal, forest green, muted orange, subtle cyan.
- Ceiling light, desk lamp, window light, monitor glow and server LEDs.
- Use baked lighting for static elements where practical.
- Avoid excessive bloom, reflections, transparent layers and real-time shadow lights.

Room must have four walls, floor, ceiling, entrance/exit, large window, desk, project wall, bookshelf, achievement shelf, server corner, lounge and secret drawer. Keep collision geometry and walking routes clear.

## 7. Required room zones

### A. Main Desk
Objects: desk, chair, dual monitors, keyboard, mouse, lamp, coffee cup, smartphone, notebook, decorations.

Interactions:
- Main monitor: virtual desktop with About, Projects, Skills, Experience, Contact, Secret Archive.
- Secondary monitor: featured/current projects.
- Keyboard: typing animation and optional terminal.
- Smartphone: contact panel.
- Notebook: personal notes.
- Coffee cup: random configured fun fact/quote.
- Desk lamp: toggle light.

### B. Project Wall
Use physical posters, framed screenshots, diagrams and polaroid-style cards. Each poster is bound to a project record. On interaction open a rich project panel with title, summary, problem, solution, technologies, role, period, status, gallery, demo and repository links.

### C. Bookshelf
Books represent Programming, Web Development, Cloud Infrastructure, AI & Automation, Hardware, Problem Solving. Approaching highlights a book. Press E / tap to animate it out and open a readable panel. Support page navigation and return animation.

### D. Achievement Shelf
Display only owner-supplied genuine achievements. Each item opens title, description, date, image and optional verification URL. Placeholder achievements must be visibly labeled as samples.

### E. Server Corner
Objects: server rack, NAS, router, switch, storage devices, monitoring screen. Interactions open diagrams for frontend, backend, API, database, cloud storage, deployment and security. Owner-configurable content.

### F. Lounge
Objects: sofa, coffee table, TV, plant, speaker, magazine.
- Sofa: sit animation and camera framing.
- TV: introduction video with playback controls and image fallback.
- Speaker: toggle background music.
- Magazine: personal stories/articles.
- Coffee table: FAQs.

### G. Window
Stylized city view. Configurable states: morning, afternoon, sunset, night, rain. Interactions: curtains, ambience and look-out camera. Use lightweight effects; no weather API required for MVP.

### H. Secret Drawer
Initially locked. Unlock via configurable password/puzzle/exploration task/identity-specific playful event. Contents may include hidden projects, behind-the-scenes notes, stories or artwork. Never store sensitive secrets here; this is entertainment, not security.

### I. Entrance / Exit
Approach door to show prompt. Exit sequence: farewell animation, optional visitor summary, guestbook invitation, return to entrance.

## 8. Interaction framework

Every interactive object uses a common typed configuration:
- id
- type
- displayName
- description
- interactionDistance
- requiredIdentity (optional; entertainment-only)
- interactionAction
- contentReference
- enabled
- worldPosition

Requirements:
- Central InteractionManager.
- Distance checks or optimized trigger volumes.
- Only one primary prompt at once.
- Prioritize nearest valid object.
- Stable selection without flicker.
- Hide prompt when out of range.
- Respect disabled state and optional identity behavior.
- Keyboard E and touch button.
- HTML/React overlays for long content, not text rendered in 3D.
- Pause or suppress player movement while modal interaction is active.
- Restore controls correctly on close.
- All buttons must perform their advertised action.

## 9. Character and camera

Desktop:
- W/A/S/D move.
- Mouse orbit camera.
- Shift run.
- E interact.
- Space optional jump.
- Escape pause menu.
- Tab optional exploration map.

Character:
- Smooth acceleration/deceleration.
- Face movement direction.
- Gravity and floor collision.
- Wall and furniture collision.
- No clipping through solid geometry.
- Correct animation transitions.

Camera:
- Third-person follow.
- Damping.
- Orbit.
- Collision avoidance.
- Configurable zoom.
- Reset camera.
- No wall/furniture clipping.

Mobile:
- Virtual joystick on left.
- Right-side drag to orbit camera.
- Contextual interaction button.
- Optional run button.
- Touch-friendly panels.
- Adaptive sizing and control hints.
- Do not show desktop-only instructions.

## 10. Identity-aware behavior

Recruiter: professional greeting; prioritize CV, experience, project wall and contact/interview CTA.

Partner: emphasize architecture, collaboration projects and contact.

Friend: casual greeting, personal stories and fun facts.

Visitor: standard guided introduction.

Thief: playful camera/alarm response and comedic locked-drawer reaction.

Ghost: floating movement, ghost effect and hidden messages.

Robot: scanning animation and technical dashboard emphasis.

Mystery: anonymous welcome and standard access.

Identity is self-selected and never proves who the visitor is. Default public portfolio content remains available to everyone.

## 11. UI and accessibility

Minimal dark translucent UI with subtle borders, shadows, rounded corners and readable typography. 3D room remains the main visual focus.

HUD:
- Top-left: avatar, visitor nickname and identity.
- Top-right: settings, sound, help, exit.
- Bottom-left: exploration progress.
- Center: contextual interaction prompt.
- Bottom-right: mobile interaction control.

Pause menu: Resume, Controls, Settings, Restart, Exit.

Settings: master/music/SFX volume, mouse sensitivity, camera sensitivity, graphics quality, reduced motion, subtitles, language.

Accessibility:
- Reduced motion.
- Keyboard-accessible panels.
- Clear labels.
- Adjustable text where practical.
- Captions for speech.
- Sound mute.
- Contrast.
- Conventional accessible portfolio navigation as fallback.

## 12. Portfolio content model

All content is data-driven.

About:
- display name
- short introduction
- biography
- profile image
- current role
- optional location
- interests
- social links

Projects:
- id, title, slug, summary, description, category
- technologies
- role
- start/end dates
- status
- thumbnail
- gallery
- demo URL
- repository URL
- featured
- sort order

Skills:
- name, category, description, optional proficiency, sort order

Experience:
- organization, position, description, dates, achievements, related projects

Achievements:
- title, description, date, image, verification URL

Stories:
- title, body, images, optional audio, publication status

Contact:
- email, website, GitHub, LinkedIn, other owner-configured accounts

Never invent owner's biography, projects, employment, achievements or contact details. Use clearly labeled sample placeholders.

## 13. Guestbook and analytics

Guestbook:
- nickname
- message
- optional identity
- timestamp
- validation and length limits
- rate limiting and spam protection
- moderation before public display
- owner approve/reject controls

Analytics:
- total visits
- unique anonymous sessions
- identity distribution
- areas discovered
- objects clicked
- session duration
- project detail views
- guestbook submissions

Minimize data collection. Disclose analytics. Use anonymous session IDs. Do not collect unnecessary personal information.

## 14. Optional future AI assistant

A small robot NPC can answer questions using configured portfolio content only:
- Who owns this room?
- Show interesting projects.
- What technologies are used?
- How can I contact the owner?
- Where is the CV?

AI integration is optional, backend-only, and must never expose provider keys to the browser.

## 15. Secret room and Easter eggs

Create a modular event system supporting:
- click a picture multiple times
- interact with books in a sequence
- enter a configured terminal command
- turn off lights
- solve a riddle
- discover hidden switch

Secret room has hidden entrance, opening animation, separate lighting, additional content and return route. Essential portfolio information must never depend on puzzles.

## 16. 3D asset pipeline and optimization

Use Blender and GLB/glTF. Separate reusable room shell, furniture, props, characters and interactive objects. Maintain consistent scale and naming.

Initial budgets:
- Main room: approximately 100k–250k visible triangles.
- Avatar: approximately 10k–30k triangles.
- Textures mostly 512–2048 px according to importance.
- Aim for fewer than 150 draw calls in the main scene where practical.

Use GLB compression, mesh and texture optimization, material reuse, instancing, baked lighting and lazy loading. Avoid unnecessary real-time shadows. Provide procedural substitutes when models are unavailable and label temporary assets in documentation.

## 17. Performance

Quality modes:
- LOW: reduced shadows/resolution/particles, minimal post-processing.
- MEDIUM: standard shadows, lighting and textures.
- HIGH: better shadows and optional effects.
- AUTO: choose a reasonable initial profile based on device capability.

Targets:
- Desktop aim 60 FPS.
- Mid-range mobile aim stable 30 FPS or better.
- Avoid blocking main-thread tasks.
- Keep initial download reasonable.
- Lazy-load larger assets.
- Dispose GPU resources on unmount/scene changes.
- Recover gracefully from asset failures.

Do not promise universal frame rates.

## 18. Backend and database

Cloudflare Workers + D1 + R2. Use parameterized SQL, migrations, validation and indexes.

Suggested D1 tables:
- visitors(id, display_name, identity, created_at)
- visitor_sessions(id, visitor_id, token_hash, started_at, ended_at, device_type, language)
- projects(id, title, slug, summary, description, category, technologies_json, role, status, thumbnail_key, gallery_json, demo_url, repository_url, featured, sort_order, created_at, updated_at)
- skills(id, name, category, description, proficiency, sort_order)
- experiences(id, organization, position, description, start_date, end_date, achievements_json)
- room_objects(id, object_type, display_name, content_reference, position_json, interaction_config_json, enabled)
- visitor_interactions(id, session_id, object_id, action, created_at)
- guestbook(id, display_name, message, status, created_at)
- portfolio_settings(key, value_json, updated_at)

## 19. Admin panel

Route: /admin.

Requirements:
- Secure owner authentication.
- Server-side authorization.
- No hardcoded admin password in frontend.
- Session management and rate limiting.

Features:
- Dashboard.
- About editor.
- Projects CRUD.
- Skills CRUD.
- Experience CRUD.
- Achievements CRUD.
- Stories CRUD.
- Room object configuration.
- Guestbook moderation.
- Analytics.
- Site settings.
- Media management.

Content changes should reflect without rebuilding the frontend whenever possible.

## 20. Recommended project structure

src/
  app/
  components/ui/
  components/panels/
  game/
    camera/
    controls/
    characters/
    environment/
    objects/
    interactions/
    audio/
    effects/
  features/
    visitor/
    portfolio/
    projects/
    guestbook/
    analytics/
    settings/
  stores/
  services/
  types/
  utils/
  styles/

functions/
  api/
migrations/
public/assets/
  models/
  textures/
  audio/
  images/

Do not put the entire application in one component. Keep rendering, state, interactions, content and API separate.

## 21. Development phases

### Phase 0: Foundation
Initialize repository, Vite, React, TypeScript, styling, dependencies, architecture, linting, environment templates and docs.

### Phase 1: Playable room
Build room shell, furniture, lighting, third-person character, movement, camera, collisions, desktop and mobile controls. Deliver a playable room.

### Phase 2: Entrance and avatars
Entrance scene, visitor form, eight identities, avatar preview, avatar assignment and skippable entry cinematic.

### Phase 3: Interactions
Central interaction framework and all required room objects/panels.

### Phase 4: Portfolio data
Models, API, About, projects, skills, experience, contact and localization.

### Phase 5: Gameplay polish
Animations, audio, weather, identity behavior, Easter eggs, progress and exit sequence.

### Phase 6: Backend and admin
D1, Workers APIs, sessions, guestbook, analytics, admin auth and content management.

### Phase 7: Optimization and deployment
GLB optimization, quality presets, mobile tests, failure handling and Cloudflare deployment.

Keep the app runnable after every phase.

## 22. Required documentation

Maintain:
- README.md
- ARCHITECTURE.md
- GAME_DESIGN.md
- ASSET_GUIDE.md
- DATABASE.md
- API.md
- DEPLOYMENT.md
- PROGRESS.md
- TEST_REPORT.md
- TASKS.md

Update progress after each phase.

## 23. Non-negotiable implementation rules

1. Do not build a static mockup and claim the game is complete.
2. Do not use decorative nonfunctional buttons.
3. Do not fake loading progress.
4. Do not hardcode all portfolio content into scene components.
5. Do not use a monolithic component.
6. Do not make interactions mouse-only.
7. Do not use unoptimized huge models.
8. Do not hide essential information behind puzzles.
9. Do not invent owner facts.
10. Clearly label sample content.
11. Document architecture decisions.
12. Test every major feature.
13. Fix existing errors before adding features.
14. Keep the app runnable after each phase.
15. Use reusable components and consistent naming.
16. Document limitations instead of silently skipping requirements.
17. Document any paid service and cost.
18. Never expose credentials.
19. Keep a non-3D accessible content route.
20. Provide a test report with PASS / FAIL / NOT IMPLEMENTED.

## 24. Initial execution instruction

You are the lead full-stack engineer and 3D web game developer for THE ROOM.

Read this specification and all supporting documents before implementation. Inspect the repository. Create task breakdown, architecture docs and project structure. Then start coding. Do not stop after planning.

Start with Phase 0 and Phase 1. Run the development server, inspect the running experience, test movement, collision, camera and mobile controls, and fix errors.

For missing models, use procedural models or clearly documented temporary assets.

After Phase 1, report:
- Implemented features.
- Files created.
- Functional and incomplete requirements.
- Commands to run.
- Test results.
- Screenshots of the running room.

The final product must be a real interactive 3D portfolio, not a static design prototype.
