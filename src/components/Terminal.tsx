import { useState, useRef, useEffect, useCallback } from 'react';
import { executeCommand, getCompletions, type TerminalLine } from '@/terminal/commands';
import { useLang } from '@/i18n/LanguageContext';
import MiniGame from './MiniGame';

const PROMPT = 'guest@dominus';
const HOST = 'dominus';

export default function TerminalComponent() {
  const { t } = useLang();
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: `${t.terminal.lastLogin} ${new Date().toUTCString()}`, type: 'system' },
    { text: t.terminal.typeHelp, type: 'system' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [gameOpen, setGameOpen] = useState(false);
  const [matrixBoost, setMatrixBoost] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Update initial lines when language changes
  useEffect(() => {
    setLines([
      { text: `${t.terminal.lastLogin} ${new Date().toUTCString()}`, type: 'system' },
      { text: t.terminal.typeHelp, type: 'system' },
      { text: '', type: 'output' },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.terminal.lastLogin, t.terminal.typeHelp]);

  const handleCommand = (cmd: string) => {
    const result = executeCommand(cmd, t, history);

    const cmdLine: TerminalLine = {
      text: `${PROMPT}@${HOST}:~$ ${cmd}`,
      type: 'command',
    };

    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, cmdLine, ...result.lines]);
    }

    if (result.launchGame) {
      setGameOpen(true);
    }

    if (result.matrixBoost) {
      setMatrixBoost(true);
      setTimeout(() => setMatrixBoost(false), 5000);
    }

    if (cmd.trim()) {
      setHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completions = getCompletions(input);
      if (completions.length === 1) {
        setInput(completions[0] + ' ');
      } else if (completions.length > 1) {
        // Show available completions
        const completionLine: TerminalLine = {
          text: `${PROMPT}@${HOST}:~$ ${input}`,
          type: 'command',
        };
        const hintLine: TerminalLine = {
          text: completions.join('  '),
          type: 'system',
        };
        setLines((prev) => [...prev, completionLine, hintLine]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const lineColor = (type: TerminalLine['type']): string => {
    switch (type) {
      case 'command': return 'text-cyber-accent';
      case 'error': return 'text-cyber-red';
      case 'success': return 'text-cyber-green';
      case 'system': return 'text-cyber-text-dim';
      case 'ascii': return 'text-cyber-green';
      default: return 'text-cyber-text';
    }
  };

  return (
    <section id="terminal" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.nav.terminal}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[06]</span>
          <h2 className="section-label">{t.terminal.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div
          className={`glass-panel glow-border overflow-hidden ${matrixBoost ? 'ring-2 ring-cyber-green/30' : ''} transition-all duration-500`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-cyber-border bg-cyber-panel/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-cyber-red/50 bg-cyber-red/20" />
              <span className="w-3 h-3 rounded-full border border-cyber-amber/50 bg-cyber-amber/20" />
              <span className="w-3 h-3 rounded-full border border-cyber-green/50 bg-cyber-green/20" />
            </div>
            <span className="font-mono text-xs text-cyber-text-dim tracking-widest" dir="ltr">
              {PROMPT}@{HOST}: ~
            </span>
            <span className="w-12" />
          </div>

          {/* Output area */}
          <div
            ref={outputRef}
            className="p-4 h-[400px] sm:h-[450px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed cursor-text"
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`${lineColor(line.type)} whitespace-pre-wrap break-words`}
                dir="ltr"
              >
                {line.text}
                {line.text === '' && '\u00A0'}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-0 flex-wrap" dir="ltr">
              <span className="text-cyber-accent whitespace-nowrap">
                {PROMPT}@{HOST}
              </span>
              <span className="text-cyber-text-dim">:~$&nbsp;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-cyber-text font-mono text-xs sm:text-sm caret-cyber-accent min-w-[100px]"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
                aria-autocomplete="none"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 font-mono text-xs text-cyber-text-dim" dir="ltr">
          {t.terminal.clickToFocus} {t.terminal.tryCommands}
        </p>
      </div>

      {gameOpen && <MiniGame onClose={() => setGameOpen(false)} />}
    </section>
  );
}
