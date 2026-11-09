import type { Plugin } from 'vite';
import { WebSocketServer, WebSocket } from 'ws';
import { validateGuestbookSubmission } from '../features/guestbook/validation';

interface PlayerData {
  id: string;
  nickname: string;
  identity: string;
  position: [number, number, number];
  rotationY: number;
  isMoving: boolean;
  isRunning: boolean;
  lastSeen: number;
}

interface GuestbookEntry {
  id: string;
  displayName: string;
  message: string;
  identity: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export function presenceWebSocketPlugin(): Plugin {
  return {
    name: 'the-room-presence-and-api',
    configureServer(server) {
      // 1. In-memory API middleware for local development (D1 backend mock)
      const mockGuestbook: GuestbookEntry[] = [];

      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // Guestbook API
        if (url.startsWith('/api/guestbook')) {
          res.setHeader('Content-Type', 'application/json');
          if (req.method === 'GET') {
            res.end(JSON.stringify(mockGuestbook.filter((entry) => entry.status === 'approved')));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            let tooLarge = false;
            req.on('data', (chunk) => {
              if (tooLarge) return;
              body += chunk.toString();
              if (body.length > 16_384) tooLarge = true;
            });
            req.on('end', () => {
              if (tooLarge) {
                res.statusCode = 413;
                res.end(JSON.stringify({ error: 'Payload too large' }));
                return;
              }
              try {
                const validation = validateGuestbookSubmission(JSON.parse(body));
                if (!validation.ok) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: validation.error }));
                  return;
                }
                const entry: GuestbookEntry = {
                  id: `entry_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                  ...validation.value,
                  status: 'pending',
                  createdAt: new Date().toISOString(),
                };
                mockGuestbook.unshift(entry);
                res.statusCode = 201;
                res.end(JSON.stringify({ success: true, entry }));
              } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              }
            });
            return;
          }
        }

        // Admin Guestbook API
        if (url.startsWith('/api/admin/guestbook')) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 503;
          res.end(JSON.stringify({ error: 'Admin API is disabled until server-side authentication is configured.' }));
          return;
        }

        // Analytics API
        if (url.startsWith('/api/analytics')) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true }));
          return;
        }

        next();
      });

      // 2. WebSocket Presence Server
      if (!server.httpServer) return;

      const wss = new WebSocketServer({
        noServer: true,
      });

      const players = new Map<string, { ws: WebSocket; data: PlayerData }>();

      server.httpServer.on('upgrade', (request, socket, head) => {
        const url = request.url || '';
        if (url.startsWith('/ws-presence')) {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        }
      });

      wss.on('connection', (ws) => {
        let clientId = '';

        // Immediately send all current players to the new client
        const currentPlayers = Array.from(players.values()).map((p) => p.data);
        if (currentPlayers.length > 0) {
          ws.send(
            JSON.stringify({
              type: 'INIT_PLAYERS',
              players: currentPlayers,
            })
          );
        }

        ws.on('message', (raw) => {
          try {
            const msg = JSON.parse(raw.toString());
            if (!msg || !msg.senderId) return;

            clientId = msg.senderId;

            if (msg.type === 'UPDATE') {
              const playerData: PlayerData = {
                id: msg.senderId,
                nickname: msg.nickname,
                identity: msg.identity,
                position: msg.position,
                rotationY: msg.rotationY || 0,
                isMoving: msg.isMoving || false,
                isRunning: msg.isRunning || false,
                lastSeen: Date.now(),
              };

              players.set(clientId, { ws, data: playerData });

              // Broadcast update to all other connected clients
              const payload = JSON.stringify({
                type: 'UPDATE',
                player: playerData,
              });

              wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(payload);
                }
              });
            } else if (msg.type === 'LEAVE') {
              players.delete(clientId);
              const payload = JSON.stringify({
                type: 'LEAVE',
                senderId: clientId,
              });
              wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(payload);
                }
              });
            }
          } catch (e) {
            console.error('WS Message parsing error:', e);
          }
        });

        ws.on('close', () => {
          if (clientId && players.has(clientId)) {
            players.delete(clientId);
            const payload = JSON.stringify({
              type: 'LEAVE',
              senderId: clientId,
            });
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
              }
            });
          }
        });
      });

      console.log('✓ Multi-visitor WebSocket Presence Server & Mock Backend attached to Vite');
    },
  };
}
