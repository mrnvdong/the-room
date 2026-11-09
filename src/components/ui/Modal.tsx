import React, { useEffect, useRef, useState } from 'react';
import { useInteractionStore } from '@/stores/useInteractionStore';
import { useGameStore } from '@/stores/useGameStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { X, Sparkles, Coffee, DoorOpen, LogOut, RefreshCw } from 'lucide-react';

import { VirtualDesktopPanel } from '../panels/VirtualDesktopPanel';
import { TerminalPanel } from '../panels/TerminalPanel';
import { PhoneContactPanel } from '../panels/PhoneContactPanel';
import { BookshelfReaderPanel } from '../panels/BookshelfReaderPanel';
import { ServerTopologyPanel } from '../panels/ServerTopologyPanel';
import { SecretDrawerPanel } from '../panels/SecretDrawerPanel';
import { LoungeTVPanel } from '../panels/LoungeTVPanel';
import { LoungeFAQPanel } from '../panels/LoungeFAQPanel';
import { WindowAmbiencePanel } from '../panels/WindowAmbiencePanel';
import { ProjectWallPanel } from '../panels/ProjectWallPanel';
import { GuestbookPanel } from '../panels/GuestbookPanel';

const COFFEE_QUOTES = [
  "The best code is the code you don't have to rewrite, but the second best is code that is a pleasure to refactor.",
  "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
  "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
  "Walking on water and developing software from a specification are easy if both are frozen. — Edward V. Berard",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "Premature optimization is the root of all evil. — Donald Knuth",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Make it work, make it right, make it fast. — Kent Beck",
];

export const Modal: React.FC = () => {
  const activeModalObject = useInteractionStore((state) => state.activeModalObject);
  const closeModal = useInteractionStore((state) => state.closeModal);
  const setGameState = useGameStore((state) => state.setGameState);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Coffee state
  const coffeeSipsCount = useRoomStateStore((state) => state.coffeeSipsCount);
  const incrementCoffeeSips = useRoomStateStore((state) => state.incrementCoffeeSips);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeModalObject) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [activeModalObject]);

  if (!activeModalObject) return null;

  const handleReturnToEntrance = () => {
    closeModal();
    setGameState('IDENTIFICATION');
  };

  const handleTakeSip = () => {
    incrementCoffeeSips();
    setQuoteIndex((prev) => (prev + 1) % COFFEE_QUOTES.length);
  };

  const getMaxWidthClass = (id: string) => {
    switch (id) {
      case 'desk.main_monitor':
        return 'max-w-5xl w-[94vw]';
      case 'wall.projects':
      case 'desk.secondary_monitor':
      case 'server.rack':
        return 'max-w-4xl w-[92vw]';
      case 'desk.keyboard':
      case 'shelf.books':
      case 'lounge.tv':
        return 'max-w-3xl w-[90vw]';
      case 'lounge.table':
        return 'max-w-2xl w-[90vw]';
      case 'secret.drawer':
      case 'desk.phone':
      case 'window.view':
      case 'desk.coffee':
      case 'entrance.door':
      default:
        return 'max-w-lg w-[90vw]';
    }
  };

  const renderContent = () => {
    switch (activeModalObject.id) {
      case 'desk.main_monitor':
        return <VirtualDesktopPanel />;

      case 'desk.keyboard':
        return <TerminalPanel />;

      case 'desk.secondary_monitor':
      case 'wall.projects':
        return <ProjectWallPanel />;

      case 'desk.phone':
        return <PhoneContactPanel />;

      case 'shelf.books':
        return <BookshelfReaderPanel />;

      case 'server.rack':
        return <ServerTopologyPanel />;

      case 'secret.drawer':
        return <SecretDrawerPanel />;

      case 'lounge.tv':
        return <LoungeTVPanel />;

      case 'lounge.table':
        return <LoungeFAQPanel />;

      case 'window.view':
        return <WindowAmbiencePanel />;

      case 'desk.coffee':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
              <Coffee className="w-4 h-4" />
              <span>Fresh Dark Roast Fuel // Mug #{coffeeSipsCount}</span>
            </div>
            <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/20 text-slate-200">
              <p className="italic text-sm leading-relaxed">
                "{COFFEE_QUOTES[quoteIndex]}"
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Total sips savored: <strong className="text-amber-400 font-mono">{coffeeSipsCount}</strong></span>
              <button
                type="button"
                onClick={handleTakeSip}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-white font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Take Another Sip</span>
              </button>
            </div>
          </div>
        );

      case 'entrance.door':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider">
                <DoorOpen className="w-4 h-4" />
                <span>Workspace Threshold & Exit</span>
              </div>
              <button
                type="button"
                onClick={handleReturnToEntrance}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit to Corridor</span>
              </button>
            </div>

            {/* Integrated Guestbook Signing */}
            <GuestbookPanel />
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeModalObject.description || 'Interactive feature details.'}
            </p>
          </div>
        );
    }
  };

  const maxWidthClass = getMaxWidthClass(activeModalObject.id);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      aria-labelledby="modal-title"
      className={`pointer-events-auto m-auto bg-slate-900/95 text-slate-100 p-5 md:p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl ${maxWidthClass} max-h-[90vh] overflow-y-auto focus:outline-none`}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <h2 id="modal-title" className="text-base md:text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-sky-400" />
          <span>{activeModalObject.displayName}</span>
        </h2>
        <button
          type="button"
          onClick={closeModal}
          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="py-1">{renderContent()}</div>

      <div className="pt-3 mt-4 border-t border-white/10 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors focus:ring-2 focus:ring-sky-400 focus:outline-none"
        >
          Close [Esc]
        </button>
      </div>
    </dialog>
  );
};
