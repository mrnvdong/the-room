# DATABASE.md — Cloudflare D1 Relational Schema & Storage

> This is a proposed schema only. No D1 database, binding, migration execution, or production API is configured yet.

## 1. Overview
The planned backend may use Cloudflare D1 for relational data. Performance and replication claims are not verified for this project.

---

## 2. Table Specifications

### `visitors`
Tracks anonymous visitor sessions, device types, and language selections:
```sql
CREATE TABLE IF NOT EXISTS visitors (
  session_id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  identity TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'desktop',
  language TEXT NOT NULL DEFAULT 'en',
  started_at TEXT NOT NULL,
  ended_at TEXT
);
```

### `guestbook`
Stores visitor notes with status moderation flags:
```sql
CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  message TEXT NOT NULL,
  identity TEXT NOT NULL DEFAULT 'visitor',
  status TEXT NOT NULL DEFAULT 'approved', -- 'pending' | 'approved' | 'rejected'
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_guestbook_status ON guestbook(status, created_at DESC);
```

### `projects`
Stores data-driven portfolio projects managed via Admin API:
```sql
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  category TEXT NOT NULL,
  technologies TEXT NOT NULL, -- JSON array string
  role TEXT,
  demo_url TEXT,
  repository_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  featured INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_sample INTEGER NOT NULL DEFAULT 1
);
```

### `analytics`
Anonymous telemetry on exploration progression and interactive hotspots:
```sql
CREATE TABLE IF NOT EXISTS analytics (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  target_id TEXT,
  timestamp TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics(event_type, timestamp DESC);
```

---

## 3. Migration Instructions
Run D1 migrations via Wrangler CLI:
```bash
# Local development migration
npx wrangler d1 execute the-room-db --local --file=./src/backend/schema.sql

# Production cloud migration
npx wrangler d1 execute the-room-db --remote --file=./src/backend/schema.sql
```
