# THE ROOM — Object Interaction Catalogue

This document is the implementation-level interaction inventory. Every object listed as interactive must have a real action.

## Global interaction contract

Each interactive object must expose:
- Stable unique ID.
- Display name and optional localized labels.
- Description.
- Interaction radius.
- Optional identity-specific response.
- Action type.
- Content reference.
- Enabled flag.
- Optional audio/animation cue.

Interaction flow:
1. Detect nearby candidates.
2. Select nearest valid object, with stable tie-breaking.
3. Highlight object.
4. Show contextual prompt.
5. Accept E or touch interaction.
6. Play object animation/sound.
7. Open relevant panel or trigger action.
8. Lock movement only when needed.
9. Restore focus and controls on close.

Do not allow multiple overlapping modal panels. Escape/back closes the topmost panel.

## Entrance

| Object ID | Object | Action | Result |
|---|---|---|---|
| entrance.doorbell | Doorbell | Press | Button animation + bell |
| entrance.camera | Security camera | Inspect | Camera tracks visitor + message |
| entrance.nameplate | Nameplate | Inspect | Owner name and short tagline |
| entrance.door | Door | Interact after identification | Door cinematic / exit |
| entrance.welcome | Welcome sign | Inspect | Welcome message |

## Main desk

| Object ID | Object | Action | Result |
|---|---|---|---|
| desk.main_monitor | Main monitor | Interact | Virtual desktop |
| desk.secondary_monitor | Secondary monitor | Interact | Featured projects |
| desk.keyboard | Keyboard | Interact | Typing animation + terminal panel |
| desk.phone | Smartphone | Interact | Contact panel |
| desk.notebook | Notebook | Interact | Notes/stories |
| desk.coffee | Coffee cup | Interact | Random configured quote/fun fact |
| desk.lamp | Desk lamp | Toggle | Toggle light |

### Virtual desktop apps
- ABOUT.exe: owner profile.
- PROJECTS.exe: project index.
- SKILLS.exe: skills.
- EXPERIENCE.exe: experience.
- CONTACT.exe: contact methods.
- SECRET.zip: playful hidden content, if enabled.

Desktop UI must support close/back and must not navigate away from the room.

## Project wall

Each poster binds to a project ID. Hover/approach highlights it. Interact opens project details:
- Summary.
- Problem.
- Solution.
- Role.
- Technologies.
- Period and status.
- Image gallery.
- Demo and repository links.

If a URL is missing, hide that action rather than rendering a dead link.

## Bookshelf

Book IDs:
- book.programming
- book.web
- book.cloud
- book.ai
- book.hardware
- book.problem_solving

Interaction: animate book sliding out, open content panel, support page/section navigation, return book on close.

## Achievement shelf

Each trophy/certificate binds to a real owner-supplied achievement. Show a visible sample marker for demo records. Do not invent awards or credentials.

## Server corner

| Object ID | Object | Result |
|---|---|---|
| server.rack | Rack | Infrastructure overview |
| server.nas | NAS | Storage architecture |
| server.router | Router | Network architecture |
| server.switch | Switch | Network topology |
| server.monitor | Monitoring screen | System dashboard |

Diagrams must be data-driven. Do not imply that sample infrastructure is actually deployed.

## Lounge

| Object ID | Object | Result |
|---|---|---|
| lounge.sofa | Sofa | Sit animation and camera framing |
| lounge.tv | Television | Intro video player / image fallback |
| lounge.speaker | Speaker | Music toggle |
| lounge.magazine | Magazine | Stories/articles |
| lounge.table | Coffee table | FAQ panel |
| lounge.plant | Plant | Optional small playful animation |

## Window

| Object ID | Object | Result |
|---|---|---|
| window.curtains | Curtains | Open/close |
| window.view | Window | Camera look-out mode |
| window.ambience | Rain/ambience control | Toggle ambient sound/effect |

## Secret drawer

| Object ID | Object | Result |
|---|---|---|
| secret.drawer | Drawer | Show locked/unlocked state |
| secret.switch | Hidden switch | Trigger configured secret event |
| secret.room_door | Hidden entrance | Open secret room if unlocked |

Secret events are optional entertainment only. Never store credentials or sensitive data in the secret room.

## Exit

Interaction opens a farewell sequence and optional guestbook/contact prompt. Provide a clear way to return or restart.

## Identity-specific reactions

- Recruiter: greeting and subtle highlights on CV, projects, experience.
- Partner: architecture and collaboration highlights.
- Friend: casual messages and stories.
- Visitor: guided first-time hints.
- Thief: playful camera/alarm response.
- Ghost: floating movement and hidden visual effects.
- Robot: scan animation and technical labels.
- Mystery: anonymous greeting.

Identity must not be treated as authentication. Default portfolio remains public.
