-- D1 Database Schema for THE ROOM
-- Migration: 0001_initial_schema.sql

-- 1. Visitor Sessions Table
CREATE TABLE IF NOT EXISTS visitors (
  session_id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  identity TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'desktop',
  language TEXT NOT NULL DEFAULT 'en',
  started_at TEXT NOT NULL,
  ended_at TEXT
);

-- 2. Guestbook Messages Table
CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  message TEXT NOT NULL,
  identity TEXT NOT NULL DEFAULT 'visitor',
  status TEXT NOT NULL DEFAULT 'approved', -- 'pending' | 'approved' | 'rejected'
  created_at TEXT NOT NULL
);

-- 3. Projects Table
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

-- 4. Analytics Telemetry Events Table
CREATE TABLE IF NOT EXISTS analytics (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'zone_enter' | 'object_interact' | 'duration'
  target_id TEXT,
  timestamp TEXT NOT NULL
);

-- Indexes for high-throughput queries
CREATE INDEX IF NOT EXISTS idx_guestbook_status ON guestbook(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics(event_type, timestamp DESC);
