import React, { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useMultiplayerStore, RemotePlayer } from '@/stores/useMultiplayerStore';
import { localAvatarState } from '@/game/avatarState';
import { getWebSocketUrl } from '@/config/api';

export const MultiplayerSync: React.FC = () => {
  const myClientId = useMultiplayerStore((state) => state.myClientId);
  const updateRemotePlayer = useMultiplayerStore(
    (state) => state.updateRemotePlayer
  );
  const removeRemotePlayer = useMultiplayerStore(
    (state) => state.removeRemotePlayer
  );
  const cleanStalePlayers = useMultiplayerStore(
    (state) => state.cleanStalePlayers
  );

  const socketRef = useRef<WebSocket | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastBroadcastRef = useRef(0);
  const prevPosRef = useRef<[number, number, number]>([0, 0, 0]);

  // Keep latest state in refs
  const visitorNicknameRef = useRef(useGameStore.getState().visitorNickname);
  const visitorIdentityRef = useRef(useGameStore.getState().visitorIdentity);
  const gameStateRef = useRef(useGameStore.getState().gameState);

  const broadcastUpdate = useCallback(
    (isMoving = false, isRunning = false) => {
      const [x, y, z] = localAvatarState.position;
      const payload = {
        type: 'UPDATE',
        senderId: myClientId,
        nickname: visitorNicknameRef.current,
        identity: visitorIdentityRef.current,
        position: [x, y, z],
        rotationY: localAvatarState.rotationY,
        isMoving,
        isRunning,
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(payload));
      }
      if (channelRef.current) {
        channelRef.current.postMessage(payload);
      }
    },
    [myClientId]
  );

  // Subscribe to store updates without resetting connection
  useEffect(() => {
    const unsub = useGameStore.subscribe((state) => {
      const prevGameState = gameStateRef.current;
      visitorNicknameRef.current = state.visitorNickname;
      visitorIdentityRef.current = state.visitorIdentity;
      gameStateRef.current = state.gameState;

      // Broadcast immediately when entering EXPLORING
      if (state.gameState === 'EXPLORING' && prevGameState !== 'EXPLORING') {
        broadcastUpdate(false, false);
      }
    });
    return unsub;
  }, [broadcastUpdate]);

  // Main Persistent WebSocket Connection
  useEffect(() => {
    let isMounted = true;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connectWebSocket = () => {
      try {
        const wsUrl = getWebSocketUrl();
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          if (!isMounted) {
            ws.close();
            return;
          }
          console.log('✓ Connected to Real-Time Presence WebSocket');
          socketRef.current = ws;

          // If already exploring, announce presence immediately
          if (gameStateRef.current === 'EXPLORING') {
            broadcastUpdate(false, false);
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (!data) return;

            if (data.type === 'INIT_PLAYERS' && Array.isArray(data.players)) {
              data.players.forEach((p: RemotePlayer) => {
                if (p.id !== myClientId) {
                  updateRemotePlayer(p);
                }
              });
            } else if (data.type === 'UPDATE' && data.player) {
              if (data.player.id !== myClientId) {
                updateRemotePlayer(data.player);
              }
            } else if (data.type === 'LEAVE' && data.senderId) {
              removeRemotePlayer(data.senderId);
            }
          } catch (err) {
            console.error('Error handling WS message:', err);
          }
        };

        ws.onclose = () => {
          if (socketRef.current === ws) {
            socketRef.current = null;
          }
          if (isMounted) {
            reconnectTimeout = setTimeout(connectWebSocket, 2000);
          }
        };

        socketRef.current = ws;
      } catch (err) {
        console.warn('WebSocket connection not available:', err);
      }
    };

    connectWebSocket();

    // BroadcastChannel fallback for multi-tab
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('the_room_presence_v1');
      channelRef.current = channel;

      channel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderId === myClientId) return;

        if (data.type === 'UPDATE') {
          const player: RemotePlayer = {
            id: data.senderId,
            nickname: data.nickname,
            identity: data.identity,
            position: data.position,
            rotationY: data.rotationY || 0,
            isMoving: data.isMoving || false,
            isRunning: data.isRunning || false,
            lastSeen: Date.now(),
          };
          updateRemotePlayer(player);
        } else if (data.type === 'LEAVE') {
          removeRemotePlayer(data.senderId);
        }
      };
    }

    // Keepalive Heartbeat: Send status every 1.5s
    // Ensures stationary visitors NEVER disappear from view!
    const heartbeatInterval = setInterval(() => {
      if (gameStateRef.current !== 'EXPLORING') return;
      broadcastUpdate(localAvatarState.isMoving, localAvatarState.isRunning);
    }, 1500);

    // Garbage collection for zombie sockets (60 seconds)
    const cleanupInterval = setInterval(() => {
      cleanStalePlayers(60000);
    }, 10000);

    const handleBeforeUnload = () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({ type: 'LEAVE', senderId: myClientId })
        );
      }
      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'LEAVE', senderId: myClientId });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimeout);
      clearInterval(heartbeatInterval);
      clearInterval(cleanupInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (socketRef.current) {
        const s = socketRef.current;
        socketRef.current = null;
        if (s.readyState === WebSocket.OPEN) {
          s.send(JSON.stringify({ type: 'LEAVE', senderId: myClientId }));
        }
        s.close();
      }

      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'LEAVE', senderId: myClientId });
        channelRef.current.close();
        channelRef.current = null;
      }
    };
  }, [
    myClientId,
    updateRemotePlayer,
    removeRemotePlayer,
    cleanStalePlayers,
    broadcastUpdate,
  ]);

  // Movement loop: 25Hz broadcast
  useEffect(() => {
    let animFrame: number;
    const syncLoop = (time: number) => {
      if (gameStateRef.current === 'EXPLORING') {
        if (time - lastBroadcastRef.current >= 40) {
          lastBroadcastRef.current = time;
          const [currX, , currZ] = localAvatarState.position;
          const [prevX, , prevZ] = prevPosRef.current;

          const distMoved = Math.hypot(currX - prevX, currZ - prevZ);
          const isMoving = distMoved > 0.005;
          prevPosRef.current = [currX, 0, currZ];

          if (isMoving) {
            broadcastUpdate(true, distMoved > 0.15);
          }
        }
      }

      animFrame = requestAnimationFrame(syncLoop);
    };

    animFrame = requestAnimationFrame(syncLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [broadcastUpdate]);

  return null;
};
