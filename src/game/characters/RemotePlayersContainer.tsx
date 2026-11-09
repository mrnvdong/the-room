import React from 'react';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';
import { RemotePlayer } from './RemotePlayer';

export const RemotePlayersContainer: React.FC = () => {
  const remotePlayersMap = useMultiplayerStore((state) => state.remotePlayers);
  const players = Array.from(remotePlayersMap.values());

  return (
    <group name="remote-players-layer">
      {players.map((player) => (
        <RemotePlayer key={player.id} player={player} />
      ))}
    </group>
  );
};
