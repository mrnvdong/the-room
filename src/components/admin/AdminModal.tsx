import React from 'react';
import { LockKeyhole, X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Admin features remain unavailable until server-side authentication is configured. */
export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-unavailable-title"
        className="w-full max-w-md space-y-4 rounded-2xl border border-amber-400/30 bg-slate-900 p-6 text-slate-100 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 id="admin-unavailable-title" className="flex items-center gap-2 text-base font-bold">
            <LockKeyhole className="h-5 w-5 text-amber-400" />
            Admin tools unavailable
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          Server-side authentication and a persistent production API are not configured. Guestbook moderation and portfolio editing are disabled; this screen does not accept or store a password.
        </p>
      </section>
    </div>
  );
};
