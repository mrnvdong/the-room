import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useI18nStore } from '@/stores/useI18nStore';
import { useMultiplayerStore, InRoomChatMessage } from '@/stores/useMultiplayerStore';
import { PRESET_CHAT_MESSAGES } from '@/features/character/characterActions';
import { MessageSquare, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import { VISITOR_IDENTITIES } from '@/features/visitor/identityData';

export const InRoomChat: React.FC = () => {
  const currentLang = useI18nStore((state) => state.language);
  const myClientId = useMultiplayerStore((state) => state.myClientId);
  const visitorNickname = useGameStore((state) => state.visitorNickname);
  const visitorIdentity = useGameStore((state) => state.visitorIdentity);

  const isChatOpen = useMultiplayerStore((state) => state.isChatOpen);
  const setChatOpen = useMultiplayerStore((state) => state.setChatOpen);
  const toggleChatOpen = useMultiplayerStore((state) => state.toggleChatOpen);
  const chatMessages = useMultiplayerStore((state) => state.chatMessages);
  const addChatMessage = useMultiplayerStore((state) => state.addChatMessage);
  const setLocalChatMessage = useMultiplayerStore(
    (state) => state.setLocalChatMessage
  );

  const [inputVal, setInputVal] = useState('');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isHistoryExpanded]);

  // Keyboard shortcut: Press 'C' or 'Enter' to open and focus chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If already in input, Enter sends message (handled in form submit)
      if (document.activeElement === inputRef.current) {
        if (e.key === 'Escape') {
          inputRef.current?.blur();
          setChatOpen(false);
        }
        return;
      }

      // If user presses C or Enter while walking in room
      if (
        (e.key === 'c' || e.key === 'C' || e.key === 'Enter') &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setChatOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setChatOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const nickname = visitorNickname || 'Explorer';

    const newMsg: InRoomChatMessage = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      senderId: myClientId,
      nickname,
      identity: visitorIdentity,
      text,
      timestamp: Date.now(),
    };

    // Add to local message history and trigger 3D speech bubble
    addChatMessage(newMsg);
    setLocalChatMessage(text);

    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const latestMessages = chatMessages.slice(-4);

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col items-start gap-2 max-w-[340px] sm:max-w-md pointer-events-auto">
      {/* 1. Floating Chat Preview Feed (Always visible when there are messages) */}
      {!isChatOpen && latestMessages.length > 0 && (
        <div className="space-y-1.5 mb-1 max-w-full">
          {latestMessages.map((msg) => {
            const isMe = msg.senderId === myClientId;
            const ident = VISITOR_IDENTITIES[msg.identity] || VISITOR_IDENTITIES.visitor;
            return (
              <div
                key={msg.id}
                onClick={() => setChatOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 text-white border border-white/10 shadow-lg backdrop-blur-md text-xs cursor-pointer hover:border-sky-400/50 transition-all animate-fade-in"
              >
                <span className="text-sm">{ident.badge}</span>
                <span className={`font-bold ${isMe ? 'text-sky-300' : 'text-emerald-400'}`}>
                  {msg.nickname}:
                </span>
                <span className="text-slate-200 truncate">{msg.text}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Main Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChatOpen}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white border border-white/10 hover:border-sky-400/50 shadow-xl backdrop-blur-md text-xs font-semibold hover:bg-slate-800 transition-all group"
          title="Phím tắt: C hoặc Enter (Mở khung trò chuyện)"
        >
          <MessageSquare className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          <span>{currentLang === 'vi' ? 'Trò chuyện trong phòng [C]' : 'Room Chat [C]'}</span>
          {chatMessages.length > 1 && (
            <span className="px-1.5 py-0.2 rounded-full bg-sky-500/30 text-sky-300 text-[10px] font-mono">
              {chatMessages.length - 1}
            </span>
          )}
        </button>
      )}

      {/* 3. Expanded Chat Window */}
      {isChatOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-sky-400/30 shadow-2xl backdrop-blur-xl p-3 text-white animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold tracking-wide">
                {currentLang === 'vi' ? 'Trò chuyện thời gian thực' : 'Real-Time In-Room Chat'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isHistoryExpanded ? 'Thu nhỏ lịch sử' : 'Mở rộng lịch sử'}
              >
                {isHistoryExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            className={`my-2 overflow-y-auto space-y-2 pr-1 custom-scrollbar transition-all ${
              isHistoryExpanded ? 'h-60' : 'h-36'
            }`}
          >
            {chatMessages.map((msg) => {
              const isMe = msg.senderId === myClientId;
              const isSys = msg.senderId === 'system';
              const ident = VISITOR_IDENTITIES[msg.identity] || VISITOR_IDENTITIES.visitor;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col text-xs ${
                    isSys
                      ? 'items-center text-center text-[11px] text-sky-400/80 bg-sky-950/30 p-1.5 rounded-lg border border-sky-900/40'
                      : isMe
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  {!isSys && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <span>{ident.badge}</span>
                      <span className="font-semibold text-white">{msg.nickname}</span>
                      <span className="text-[9px] opacity-60">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-3 py-1.5 rounded-2xl max-w-[85%] break-words leading-relaxed ${
                      isSys
                        ? ''
                        : isMe
                        ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-800 text-slate-100 rounded-tl-none border border-white/5 shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Phrases */}
          <div className="py-1 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {PRESET_CHAT_MESSAGES.map((preset, idx) => {
              const text = currentLang === 'vi' ? preset.textVi : preset.textEn;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(text)}
                  className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-slate-900 text-[10px] text-slate-300 border border-white/5 hover:border-sky-400/50 hover:text-white transition-colors"
                >
                  {text}
                </button>
              );
            })}
          </div>

          {/* Input & Send Form */}
          <form onSubmit={handleFormSubmit} className="mt-2 flex items-center gap-1.5">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              maxLength={100}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                currentLang === 'vi'
                  ? 'Gõ tin nhắn... (Enter để gửi)'
                  : 'Type a message... (Enter to send)'
              }
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 focus:border-sky-400 focus:outline-none text-xs text-white placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-sky-500 text-white disabled:opacity-40 hover:bg-sky-400 transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
