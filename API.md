# API status

## Development-only Vite middleware

`src/server/websocketPlugin.ts` provides local in-memory demo endpoints while `npm run dev` is running. The middleware is not included in the production Vite bundle or a Cloudflare Pages deployment.

### `GET /api/guestbook`

Returns approved entries from the current dev-server memory. The list starts empty and resets when the server restarts.

### `POST /api/guestbook`

Accepts JSON with `displayName` (1–30 trimmed characters), `message` (3–300 trimmed characters), and optional visitor `identity`. Invalid bodies receive `400`; payloads over 16 KiB receive `413`. New entries are marked `pending` and are not shown in the public list. Pending entries live only in memory.

### `/api/admin/guestbook`

Returns `503`. Admin authentication, authorization, persistent moderation, and production routes are not implemented. The UI disables admin tools.

### `/api/analytics`

Returns a development placeholder response only. It does not persist analytics.

## Multiplayer status

`/ws-presence` is a local Vite WebSocket demonstration. It has no production Worker/Durable Object, authentication, or robust untrusted-message validation. Do not expose it as a production service.

## Production API status

Cloudflare Pages Functions, D1 bindings, migrations, admin sessions, rate limiting, and production API tests are **NOT IMPLEMENTED**. No production API guarantees are made.
