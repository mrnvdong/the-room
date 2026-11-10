import React, { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import {
  useMultiplayerStore,
  RemotePlayer,
  InRoomChatMessage,
} from '@/stores/useMultiplayerStore';
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
  const addChatMessage = useMultiplayerStore((state) => state.addChatMessage);

  const socketRef = useRef<WebSocket | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastBroadcastRef = useRef(0);
  const prevPosRef = useRef<[number, number, number]>([0, 0, 0]);

  // Keep latest state in refs
  const visitorNicknameRef = useRef(useGameStore.getState().visitorNickname);
  const visitorIdentityRef = useRef(useGameStore.getState().visitorIdentity);
  const gameStateRef = useRef(useGameStore.getState().gameState);

  const localActionRef = useRef(useMultiplayerStore.getState().localAction);
  const localActionStartTimeRef = useRef(
    useMultiplayerStore.getState().localActionStartTime
  );
  const isLocalSittingRef = useRef(
    useMultiplayerStore.getState().isLocalSitting
  );
  const localChatMessageRef = useRef(
    useMultiplayerStore.getState().localChatMessage
  );

  const sendPayload = useCallback((payload: Record<string, unknown>) => {
    const json = JSON.stringify(payload);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(json);
    }
    if (channelRef.current) {
      channelRef.current.postMessage(payload);
    }
  }, []);

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
        currentAction: localActionRef.current,
        actionStartTime: localActionStartTimeRef.current,
        isSitting: isLocalSittingRef.current,
        chatMessage: localChatMessageRef.current,
      };

      sendPayload(payload);
    },
    [myClientId, sendPayload]
  );

  // Subscribe to useGameStore
  useEffect(() => {
    const unsub = useGameStore.subscribe((state) => {
      const prevGameState = gameStateRef.current;
      visitorNicknameRef.current = state.visitorNickname;
      visitorIdentityRef.current = state.visitorIdentity;
      gameStateRef.current = state.gameState;

      if (state.gameState === 'EXPLORING' && prevGameState !== 'EXPLORING') {
        broadcastUpdate(false, false);
      }
    });
    return unsub;
  }, [broadcastUpdate]);

  // Subscribe to useMultiplayerStore for Actions & Sitting
  useEffect(() => {
    const unsub = useMultiplayerStore.subscribe((state) => {
      const prevAction = localActionRef.current;
      const prevSitting = isLocalSittingRef.current;
      const prevChat = localChatMessageRef.current;

      localActionRef.current = state.localAction;
      localActionStartTimeRef.current = state.localActionStartTime;
      isLocalSittingRef.current = state.isLocalSitting;
      localChatMessageRef.current = state.localChatMessage;

      // Broadcast immediately when action or sitting changes
      if (
        state.localAction !== prevAction ||
        state.isLocalSitting !== prevSitting
      ) {
        sendPayload({
          type: 'ACTION',
          senderId: myClientId,
          action: state.localAction,
          actionStartTime: state.localActionStartTime,
          isSitting: state.isLocalSitting,
        });
        broadcastUpdate(false, false);
      }

      // Broadcast chat when new local chat is set
      if (state.localChatMessage && state.localChatMessage !== prevChat) {
        sendPayload({
          type: 'CHAT',
          senderId: myClientId,
          nickname: visitorNicknameRef.current,
          identity: visitorIdentityRef.current,
          text: state.localChatMessage,
          timestamp: Date.now(),
        });
      }
    });
    return unsub;
  }, [myClientId, broadcastUpdate, sendPayload]);

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
            } else if (data.type === 'CHAT' && data.senderId !== myClientId) {
              // Add to chat log
              const chatMsg: InRoomChatMessage = {
                id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                senderId: data.senderId,
                nickname: data.nickname || 'Visitor',
                identity: data.identity || 'visitor',
                text: data.text || '',
                timestamp: data.timestamp || Date.now(),
              };
              addChatMessage(chatMsg);

              // Update remote player speech bubble
              const existing = useMultiplayerStore.getState().remotePlayers.get(data.senderId);
              if (existing) {
                updateRemotePlayer({
                  ...existing,
                  chatMessage: data.text,
                  chatExpiresAt: Date.now() + 7000,
                });
              }
            } else if (data.type === 'ACTION' && data.senderId !== myClientId) {
              const existing = useMultiplayerStore.getState().remotePlayers.get(data.senderId);
              if (existing) {
                updateRemotePlayer({
                  ...existing,
                  currentAction: data.action,
                  actionStartTime: data.actionStartTime || Date.now(),
                  isSitting: Boolean(data.isSitting),
                });
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
            currentAction: data.currentAction,
            actionStartTime: data.actionStartTime,
            isSitting: data.isSitting,
            chatMessage: data.chatMessage,
            chatExpiresAt: data.chatMessage ? Date.now() + 7000 : undefined,
            lastSeen: Date.now(),
          };
          updateRemotePlayer(player);
        } else if (data.type === 'CHAT') {
          const chatMsg: InRoomChatMessage = {
            id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            senderId: data.senderId,
            nickname: data.nickname || 'Visitor',
            identity: data.identity || 'visitor',
            text: data.text || '',
            timestamp: data.timestamp || Date.now(),
          };
          addChatMessage(chatMsg);

          const existing = useMultiplayerStore.getState().remotePlayers.get(data.senderId);
          if (existing) {
            updateRemotePlayer({
              ...existing,
              chatMessage: data.text,
              chatExpiresAt: Date.now() + 7000,
            });
          }
        } else if (data.type === 'ACTION') {
          const existing = useMultiplayerStore.getState().remotePlayers.get(data.senderId);
          if (existing) {
            updateRemotePlayer({
              ...existing,
              currentAction: data.action,
              actionStartTime: data.actionStartTime || Date.now(),
              isSitting: Boolean(data.isSitting),
            });
          }
        } else if (data.type === 'LEAVE') {
          removeRemotePlayer(data.senderId);
        }
      };
    }

    // Keepalive Heartbeat: Send status every 1.5s
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
    addChatMessage,
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
