import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'What is THE ROOM?',
    a: 'THE ROOM is an interactive portfolio prototype. The 3D room and controls are local demo features.',
  },
  {
    q: 'Are the portfolio details real?',
    a: 'No. Example projects and profile text are demo content until the owner supplies verified details.',
  },
  {
    q: 'Can I contact the owner here?',
    a: 'Contact details and message delivery have not been configured. This demo does not send messages.',
  },
  {
    q: 'Is the multiplayer service production-ready?',
    a: 'No. Presence currently uses a local development WebSocket server and is not deployed as a production service.',
  },
];

export const LoungeFAQPanel: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-white/20 bg-slate-950 p-6 font-sans text-slate-100 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <HelpCircle className="h-5 w-5 text-amber-400" />
        <h3 className="text-base font-bold text-white">THE ROOM // FAQ</h3>
      </div>
      <div className="space-y-2">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.q} className="overflow-hidden rounded-xl border border-white/5 bg-slate-900">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold text-white"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-sky-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              {isOpen && <p className="border-t border-white/5 px-4 pb-3.5 pt-2 text-xs leading-relaxed text-slate-300">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
