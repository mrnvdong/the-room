# Deployment status

Production deployment is **not configured**. There is no `wrangler.toml`/`wrangler.json`, Cloudflare Pages Functions directory, D1 binding, or production authentication. The local Vite API and WebSocket plugins do not run when serving the static `dist/` directory.

Do not deploy this build as a complete portfolio service. A static preview can be built with:

```bash
npm run build
npm run preview
```

This preview has no persistent guestbook, moderation, admin tools, analytics, or production multiplayer. The local demo server stores guestbook and presence state in memory only.

## Work required before production

1. Add Cloudflare Pages Functions (or a Worker) and configure D1 bindings and migrations.
2. Implement server-side admin authentication, secure sessions, authorization, and rate limiting.
3. Persist guestbook entries as pending; expose only approved notes and protect moderation endpoints.
4. Provide a production multiplayer service with payload validation and abuse controls, or disable multiplayer in production.
5. Configure environment bindings, run migration and API integration tests, and verify the deployed site before claiming release readiness.
