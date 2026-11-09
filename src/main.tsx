import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import { useInteractionStore } from './stores/useInteractionStore';
import { useRoomStateStore } from './stores/useRoomStateStore';
import { useGameStore } from './stores/useGameStore';

// Expose stores for automated E2E and debug verification
if (typeof window !== 'undefined') {
  (window as unknown as { __ROOM_STORES__: unknown }).__ROOM_STORES__ = {
    interaction: useInteractionStore,
    room: useRoomStateStore,
    game: useGameStore,
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
