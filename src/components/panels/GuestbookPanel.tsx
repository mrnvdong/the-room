import React, { useState } from 'react';
import { useGuestbookStore } from '@/features/guestbook/useGuestbookStore';
import { useGameStore } from '@/stores/useGameStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { MessageSquare, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const GuestbookPanel: React.FC = () => {
  const visitorNickname = useGameStore((state) => state.visitorNickname);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);
  const language = useI18nStore((state) => state.language);

  const entries = useGuestbookStore((state) => state.entries);
  const isSubmitting = useGuestbookStore((state) => state.isSubmitting);
  const submitSuccess = useGuestbookStore((state) => state.submitSuccess);
  const error = useGuestbookStore((state) => state.error);
  const submitEntry = useGuestbookStore((state) => state.submitEntry);

  const [authorName, setAuthorName] = useState(
    visitorNickname === 'Visitor' ? '' : visitorNickname
  );
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitEntry(
      authorName.trim() || 'Visitor',
      message.trim(),
      visitorIdentity
    );
    if (ok) {
      setMessage('');
    }
  };

  const approvedEntries = entries.filter((e) => e.status === 'approved');

  return (
    <div className="space-y-5 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-base text-white">
            {language === 'vi' ? 'Sổ Lưu Bút Khách Thăm' : 'Visitor Guestbook'}
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {approvedEntries.length} {language === 'vi' ? 'lời nhắn' : 'notes'}
        </span>
      </div>

      <p role="note" className="rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-[11px] leading-relaxed text-amber-200">
        {language === 'vi'
          ? 'Bản demo local: lời nhắn chỉ nằm trong bộ nhớ tạm, chờ duyệt và sẽ mất khi tắt máy chủ. Chức năng quản trị chưa bật.'
          : 'Local demo: notes are temporary in-memory submissions pending review and are lost when the dev server stops. Admin moderation is disabled.'}
      </p>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-800/40 rounded-xl border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder={language === 'vi' ? 'Tên của bạn...' : 'Your name...'}
            value={authorName}
            maxLength={30}
            onChange={(e) => setAuthorName(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-white/10 focus:border-sky-400 text-xs text-white placeholder-slate-500 outline-none font-sans"
          />
        </div>

        <textarea
          placeholder={language === 'vi' ? 'Để lại cảm nghĩ hoặc lời chào của bạn tại đây...' : 'Leave a note or feedback for Dong...'}
          value={message}
          maxLength={300}
          rows={2}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-white/10 focus:border-sky-400 text-xs text-white placeholder-slate-500 outline-none resize-none font-sans"
        />

        {error && <div className="text-xs text-rose-400 font-mono">{error}</div>}
        {submitSuccess && (
          <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Đã gửi lời nhắn. Lời nhắn chỉ hiển thị sau khi được duyệt.' : 'Note submitted. It will appear after moderation.'}</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] text-slate-500 font-mono">{message.length}/300</span>
          <button
            type="submit"
            disabled={isSubmitting || message.trim().length < 3}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs transition-colors shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? '...' : language === 'vi' ? 'Ký Tên' : 'Sign Guestbook'}</span>
          </button>
        </div>
      </form>

      {/* Message List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {approvedEntries.map((item) => (
          <div
            key={item.id}
            className="p-3.5 bg-slate-900/60 rounded-xl border border-white/5 space-y-1.5 hover:border-white/15 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>{item.displayName}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
