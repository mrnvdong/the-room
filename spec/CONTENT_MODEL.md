# THE ROOM — Content Model and Sample Data Rules

## General rules

- All content is external to 3D mesh components.
- Use typed TypeScript models and schema validation.
- The owner must be able to update content through the admin interface later.
- Never invent personal facts, real projects, employment, awards, or contact information.
- Sample records must contain `isSample: true` or an equivalent explicit marker.

## Core types

### PortfolioProfile
- displayName: string
- headline: string
- shortBio: string
- biography: string
- profileImage?: string
- currentRole?: string
- location?: string
- interests: string[]
- socialLinks: SocialLink[]

### Project
- id: string
- title: string
- slug: string
- summary: string
- description: string
- problem?: string
- solution?: string
- category: string
- technologies: string[]
- role?: string
- startDate?: string
- endDate?: string
- status: draft | active | completed | archived
- thumbnail?: string
- gallery: string[]
- demoUrl?: string
- repositoryUrl?: string
- featured: boolean
- sortOrder: number
- isSample: boolean

### Skill
- id: string
- name: string
- category: string
- description?: string
- proficiency?: number
- sortOrder: number

Proficiency is optional. Do not infer or fabricate a percentage.

### Experience
- id: string
- organization: string
- position: string
- description: string
- startDate?: string
- endDate?: string
- achievements: string[]
- relatedProjectIds: string[]
- isSample: boolean

### Achievement
- id: string
- title: string
- description: string
- date?: string
- image?: string
- verificationUrl?: string
- isSample: boolean

### Story
- id: string
- title: string
- body: string
- images: string[]
- audioUrl?: string
- published: boolean

### ContactProfile
- email?: string
- website?: string
- github?: string
- linkedin?: string
- otherLinks: SocialLink[]

### RoomObjectConfig
- id: string
- type: string
- displayName: LocalizedString
- description?: LocalizedString
- interactionDistance: number
- requiredIdentity?: string[]
- action: string
- contentReference?: string
- enabled: boolean
- position: [number, number, number]

### VisitorSession
- id: string
- nickname?: string
- identity: recruiter | partner | friend | visitor | thief | ghost | robot | mystery
- startedAt: string
- endedAt?: string
- deviceType?: desktop | tablet | mobile
- language: vi | en

### GuestbookMessage
- id: string
- displayName: string
- message: string
- status: pending | approved | rejected
- createdAt: string

## Localization

Use `vi` and `en` dictionaries. Do not scatter hardcoded visible strings through scene components. Every object name, prompt, button, message, and panel heading must have a localization key.

## Initial owner configuration

Use placeholders until the owner supplies exact details:
- Owner display name: DONG (configurable).
- Workspace name: DONG'S PRIVATE WORKSPACE.
- Tagline: A Portfolio You Don't Scroll. You Explore.
- Default language: English.
- Supported languages: English and Vietnamese.

Do not invent email, GitHub URL, LinkedIn URL, CV, employment history, education, project claims or achievements.
