import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

interface TerminalEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerminalPanel: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([
    { type: 'output', text: 'THE ROOM OS — Interactive Developer Shell v2.4.0' },
    { type: 'output', text: 'Type "help" to list available commands.' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newEntries: TerminalEntry[] = [{ type: 'input', text: `dong@the-room:~$ ${rawCmd}` }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Available commands:
  about       - Explain the current demo profile state
  projects    - List example project records
  skills      - Explain the example skills data
  contact     - Show contact configuration state
  matrix      - Display a retro ASCII demo banner
  hint        - Display a clue for unlocking the physical secret drawer
  admin       - Show admin configuration state
  clear       - Clear terminal buffer
  exit        - Close terminal shell`,
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `Owner profile is not configured yet. Only the display name DONG has been supplied.`,
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `[DEMO DATA ONLY] Example projects are placeholders and are not verified owner work.`,
        });
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `[DEMO DATA ONLY] Verified owner skills have not been provided.`,
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Contact details have not been provided. No contact link is configured.`,
        });
        break;

      case 'hint':
        newEntries.push({
          type: 'success',
          text: `[DECRYPTION HINT]
The passcode to the Secret Drawer is the classic elite hacker number: 1337.
Walk over to the secret drawer by the desk and input 1337 on the keypad!`,
        });
        break;

      case 'matrix':
        newEntries.push({
          type: 'success',
          text: `
  _____ _   _ _____   ____   ___   ___  __  __ 
 |_   _| | | | ____| |  _ \\ / _ \\ / _ \\|  \\/  |
   | | | |_| |  _|   | |_) | | | | | | | |\\/| |
   | | |  _  | |___  |  _ <| |_| | |_| | |  | |
   |_| |_| |_|_____| |_| \\_\\\\___/ \\___/|_|  |_|
 >>> LOCAL DEMO // METRICS ARE NOT LIVE <<<`,
        });
        break;

      case 'admin':
        newEntries.push({
          type: 'error',
          text: `Admin tools are disabled. Server-side authentication and a persistent API are not configured.`,
        });
        break;

      case 'sudo':
        newEntries.push({
          type: 'error',
          text: `Permission denied: Visitor account has read-only exploration privileges.
"Nice try, hacker! But there's no root backdoor here."`,
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `bash: command not found: ${rawCmd}. Type "help" for a list of valid commands.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputValue(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIdx);
        setInputValue(cmdHistory[nextIdx] || '');
      }
    }
  };

  return (
    <div className="flex flex-col h-[480px] bg-slate-950 rounded-2xl border border-emerald-500/40 shadow-2xl font-mono text-xs overflow-hidden">
      {/* Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-wider">
            terminal@dong-workspace: ~
          </span>
        </div>
        <div className="text-[10px] text-slate-400">bash 5.2.15</div>
      </div>

      {/* Output Console Buffer */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-slate-200">
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.type === 'input'
                ? 'text-sky-300 font-semibold'
                : item.type === 'error'
                ? 'text-rose-400'
                : item.type === 'success'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-300'
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-white/10">
        <span className="text-emerald-400 font-bold select-none">
          dong@the-room:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type a command ("help", "about", "projects", "hint")...'
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs"
        />
        <CornerDownLeft className="w-3.5 h-3.5 text-slate-500" />
      </div>
    </div>
  );
};
