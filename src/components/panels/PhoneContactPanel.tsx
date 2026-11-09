import React from 'react';
import { ContactRound } from 'lucide-react';

export const PhoneContactPanel: React.FC = () => (
  <section className="mx-auto max-w-md space-y-3 rounded-2xl border border-white/10 bg-slate-950 p-6 text-slate-100">
    <h3 className="flex items-center gap-2 font-bold text-white">
      <ContactRound className="h-5 w-5 text-sky-400" /> Contact
    </h3>
    <p className="text-sm leading-relaxed text-slate-300">
      Contact details have not been provided yet. No message is sent or stored from this demo panel.
    </p>
  </section>
);
