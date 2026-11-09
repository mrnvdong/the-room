# THE ROOM — Acceptance Test Checklist

A feature is not complete because a component renders. It must behave correctly.

## Phase 0: Foundation
- [ ] Project installs from documented commands.
- [ ] Dev server starts.
- [ ] TypeScript check passes.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] Environment example exists; no secrets committed.

## Phase 1: Playable room
- [ ] Room shell renders.
- [ ] Floor, walls and ceiling are present.
- [ ] Desk, chair, bookshelf, sofa and window are present.
- [ ] Avatar is visible.
- [ ] WASD movement works.
- [ ] Character faces movement direction.
- [ ] Mouse orbit works.
- [ ] Camera follows smoothly.
- [ ] Collision prevents walking through walls.
- [ ] Collision prevents walking through major furniture.
- [ ] Character remains on floor.
- [ ] Shift running works.
- [ ] Mobile joystick works.
- [ ] Mobile camera drag works.
- [ ] UI fits desktop and mobile.

## Phase 2: Entrance and avatars
- [ ] Loading reflects real asset progress.
- [ ] Entrance scene renders.
- [ ] Doorbell works.
- [ ] Security camera interaction works.
- [ ] Nickname is optional and limited to 30 characters.
- [ ] All eight identities can be selected.
- [ ] Correct avatar is assigned for each identity.
- [ ] Avatar preview works.
- [ ] Entry cinematic works and can be skipped.
- [ ] Visitor session is initialized.

## Phase 3: Interactions
- [ ] Nearby object highlights.
- [ ] Only one primary prompt appears.
- [ ] Prompt hides outside interaction radius.
- [ ] E key activates object.
- [ ] Touch button activates object.
- [ ] Main monitor opens virtual desktop.
- [ ] Secondary monitor opens featured projects.
- [ ] Phone opens contact panel.
- [ ] Notebook opens notes.
- [ ] Coffee cup shows configured quote.
- [ ] Lamp toggles.
- [ ] Project posters open correct project.
- [ ] Books animate and open correct content.
- [ ] Achievement items open correct content.
- [ ] Server objects open correct diagrams.
- [ ] Sofa triggers sitting behavior.
- [ ] TV opens video or fallback.
- [ ] Speaker toggles sound.
- [ ] Window controls work.
- [ ] Secret drawer has locked/unlocked states.
- [ ] Exit sequence works.
- [ ] Closing panels restores controls.

## Phase 4: Portfolio
- [ ] About content is data-driven.
- [ ] Projects load from content service.
- [ ] Skills load from content service.
- [ ] Experience loads from content service.
- [ ] Contact links are valid and optional.
- [ ] Vietnamese and English localization work.
- [ ] Missing optional URLs do not create dead buttons.
- [ ] Sample data is clearly marked.

## Phase 5: Polish
- [ ] Walk/run/idle/interact animations transition correctly.
- [ ] Audio controls work.
- [ ] No audio starts unexpectedly before user gesture.
- [ ] Reduced-motion option works.
- [ ] Weather effects can be disabled.
- [ ] Identity-specific reactions work.
- [ ] Exploration progress counts unique areas only.
- [ ] Easter eggs do not block essential content.

## Phase 6: Backend and admin
- [ ] D1 migrations apply.
- [ ] API validates input.
- [ ] SQL is parameterized.
- [ ] Guestbook messages are moderated.
- [ ] Rate limiting is applied.
- [ ] Analytics use anonymous session identifiers.
- [ ] Admin authentication is server-side.
- [ ] Unauthorized admin requests are rejected.
- [ ] Owner can create/update/delete projects.
- [ ] Owner can manage other content types.
- [ ] Media upload uses R2 or documented local fallback.

## Phase 7: Optimization and deployment
- [ ] Low/medium/high quality presets work.
- [ ] Assets lazy-load.
- [ ] GLB and textures are optimized.
- [ ] GPU resources are disposed correctly.
- [ ] No critical browser console errors.
- [ ] Mobile experience is usable.
- [ ] Asset/network failures show recovery options.
- [ ] Cloudflare deployment steps are documented.
- [ ] Final test report marks PASS / FAIL / NOT IMPLEMENTED accurately.

## Required final QA report

For each item include:
- Status.
- How it was tested.
- Result.
- Known issue.
- Evidence or screenshot where relevant.

Never mark an untested item PASS.
