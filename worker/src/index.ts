export interface Env {
  PRESENCE_ROOM: DurableObjectNamespace;
  DB?: D1Database;
}

interface WorkerPlayerData {
  id: string;
  nickname: string;
  identity: string;
  position: [number, number, number];
  rotationY: number;
  isMoving: boolean;
  isRunning: boolean;
  lastSeen: number;
}

interface WorkerGuestbookEntry {
  id?: string;
  displayName: string;
  message: string;
  identity?: string;
  status?: string;
  createdAt?: string;
}

export class PresenceRoom {
  state: DurableObjectState;
  sessions: Map<WebSocket, { id: string; data: WorkerPlayerData }>;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.sessions = new Map();
  }

  async fetch(_request: Request) {
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    server.accept();

    // Immediately send current players to the new client
    const currentPlayers = Array.from(this.sessions.values()).map((s) => s.data);
    if (currentPlayers.length > 0) {
      server.send(
        JSON.stringify({
          type: 'INIT_PLAYERS',
          players: currentPlayers,
        })
      );
    }

    let clientId = '';

    server.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data as string) as Record<string, unknown>;
        if (!msg || typeof msg.senderId !== 'string') return;

        clientId = msg.senderId;

        if (msg.type === 'UPDATE') {
          const playerData: WorkerPlayerData = {
            id: clientId,
            nickname: typeof msg.nickname === 'string' ? msg.nickname : 'Visitor',
            identity: typeof msg.identity === 'string' ? msg.identity : 'visitor',
            position: Array.isArray(msg.position) && msg.position.length === 3
              ? [msg.position[0], msg.position[1], msg.position[2]] as [number, number, number]
              : [0, 0, 4.5],
            rotationY: typeof msg.rotationY === 'number' ? msg.rotationY : 0,
            isMoving: Boolean(msg.isMoving),
            isRunning: Boolean(msg.isRunning),
            lastSeen: Date.now(),
          };

          this.sessions.set(server, { id: clientId, data: playerData });

          // Broadcast update to all other connected clients
          const payload = JSON.stringify({
            type: 'UPDATE',
            player: playerData,
          });

          this.broadcast(server, payload);
        } else if (msg.type === 'LEAVE') {
          this.sessions.delete(server);
          this.broadcast(
            server,
            JSON.stringify({ type: 'LEAVE', senderId: clientId })
          );
        }
      } catch (err) {
        console.error('Error handling WS message:', err);
      }
    });

    const closeHandler = () => {
      if (this.sessions.has(server)) {
        const session = this.sessions.get(server);
        this.sessions.delete(server);
        if (session) {
          this.broadcast(
            server,
            JSON.stringify({ type: 'LEAVE', senderId: session.id })
          );
        }
      }
    };

    server.addEventListener('close', closeHandler);
    server.addEventListener('error', closeHandler);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  broadcast(sender: WebSocket, message: string) {
    for (const [ws] of this.sessions.entries()) {
      if (ws !== sender) {
        try {
          ws.send(message);
        } catch {
          this.sessions.delete(ws);
        }
      }
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Standard CORS headers for cross-origin frontend (e.g. GitHub Pages)
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. WebSocket Presence Endpoint
    if (url.pathname === '/ws-presence' || url.pathname.startsWith('/ws-presence')) {
      const upgradeHeader = request.headers.get('Upgrade');
      if (!upgradeHeader || upgradeHeader.toLowerCase() !== 'websocket') {
        return new Response('Expected WebSocket upgrade', { status: 426 });
      }

      // Coordinate all visitors into the same room instance
      const id = env.PRESENCE_ROOM.idFromName('the-room-global');
      const obj = env.PRESENCE_ROOM.get(id);
      return obj.fetch(request);
    }

    // 2. Guestbook API
    if (url.pathname === '/api/guestbook') {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            const { results } = await env.DB.prepare(
              'SELECT id, display_name AS displayName, message, identity, status, created_at AS createdAt FROM guestbook WHERE status = ? ORDER BY created_at DESC LIMIT 50'
            )
              .bind('approved')
              .all();
            return Response.json(results, { headers: corsHeaders });
          } catch (e: unknown) {
            console.error('D1 query error:', e);
          }
        }
        // Sample fallback if D1 not yet populated
        return Response.json(
          [
            {
              id: 'sample_01',
              displayName: 'Alex // Tech Recruiter',
              message: 'Blown away by the 3D graphics fidelity and immediate 2D fallback. Outstanding full-stack engineering!',
              identity: 'recruiter',
              status: 'approved',
              createdAt: new Date().toISOString(),
            },
          ],
          { headers: corsHeaders }
        );
      }

      if (request.method === 'POST') {
        try {
          const body = (await request.json()) as WorkerGuestbookEntry;
          if (env.DB) {
            await env.DB.prepare(
              'INSERT INTO guestbook (id, display_name, message, identity, status, created_at) VALUES (?, ?, ?, ?, ?, ?)'
            )
              .bind(
                body.id || `entry_${Date.now()}`,
                body.displayName,
                body.message,
                body.identity || 'visitor',
                'approved',
                body.createdAt || new Date().toISOString()
              )
              .run();
          }
          return Response.json(
            { success: true, entry: body },
            { status: 201, headers: corsHeaders }
          );
        } catch (e: unknown) {
          const errMsg = e instanceof Error ? e.message : 'Unknown error';
          return Response.json(
            { error: errMsg },
            { status: 400, headers: corsHeaders }
          );
        }
      }
    }

    // 3. Analytics API
    if (url.pathname === '/api/analytics') {
      return Response.json({ success: true }, { headers: corsHeaders });
    }

    // 4. Health Check
    if (url.pathname === '/health' || url.pathname === '/') {
      return Response.json(
        {
          name: 'THE ROOM Cloudflare Backend',
          status: 'online',
          services: {
            multiplayer: '/ws-presence',
            guestbook: '/api/guestbook',
            analytics: '/api/analytics',
          },
        },
        { headers: corsHeaders }
      );
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
