import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

interface ThreatEvent {
  id: number;
  textKey: keyof typeof threatKeys;
  key: string;
  timeLeft: number;
  maxTime: number;
}

const threatKeys = {
  intrusion: 'q',
  malware: 'w',
  portScan: 'e',
  bruteForce: 'a',
  dataExfil: 's',
  rootkit: 'd',
  phishing: 'r',
  exploit: 'f',
} as const;

export default function MiniGame({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'over'>('ready');
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [log, setLog] = useState<string[]>([`> ${t.game.breachSim} v1.0`]);
  const threatIdRef = useRef(0);

  const threatEntries = Object.entries(threatKeys) as [keyof typeof threatKeys, string][];

  const addLog = (msg: string) => {
    setLog((prev) => [...prev.slice(-8), msg]);
  };

  const spawnThreat = useCallback(() => {
    if (gameState !== 'playing') return;
    const entry = threatEntries[Math.floor(Math.random() * threatEntries.length)];
    const maxTime = 3000;
    const threat: ThreatEvent = {
      id: threatIdRef.current++,
      textKey: entry[0],
      key: entry[1],
      timeLeft: maxTime,
      maxTime,
    };
    setThreats((prev) => [...prev, threat]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    spawnThreat();
    const spawnInterval = setInterval(spawnThreat, 1800 + Math.random() * 800);
    return () => clearInterval(spawnInterval);
  }, [gameState, spawnThreat]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const tick = setInterval(() => {
      setThreats((prev) =>
        prev
          .map((th) => ({ ...th, timeLeft: th.timeLeft - 100 }))
          .filter((th) => {
            if (th.timeLeft <= 0) {
              setLives((l) => {
                const newLives = l - 1;
                if (newLives <= 0) setGameState('over');
                return newLives;
              });
              addLog(`> ${t.game.threatEscaped}: ${t.threats[th.textKey]}`);
              return false;
            }
            return true;
          })
      );
    }, 100);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const handleThreat = (key: string) => {
    if (gameState !== 'playing') return;
    setThreats((prev) => {
      const threat = prev.find((th) => th.key === key);
      if (threat) {
        setScore((s) => s + 10);
        addLog(`> ${t.game.neutralized}: ${t.threats[threat.textKey]}`);
        return prev.filter((th) => th.id !== threat.id);
      }
      return prev;
    });
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['q', 'w', 'e', 'a', 's', 'd', 'r', 'f'].includes(key)) {
        e.preventDefault();
        handleThreat(key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, threats]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setThreats([]);
    setLog([`> ${t.game.breachSim} v1.0`, `> ${t.game.systemInit}`, `> ${t.game.defendThreats}`]);
    setGameState('playing');
  };

  const keyMap = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f'];
  const statusLabel = gameState === 'ready' ? t.game.ready : gameState === 'playing' ? t.game.playing : t.game.over;

  return (
    <div
      className="fixed inset-0 z-[9500] bg-cyber-bg/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t.game.breachSim}
    >
      <div className="glass-panel glow-border w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-cyber-text-dim hover:text-cyber-red transition-colors"
          aria-label={t.game.closeGame}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="font-mono text-xs text-cyber-text-dim mb-1 tracking-widest">
          // BREACH_SIMULATION
        </div>
        <h3 className="font-display font-bold text-xl text-cyber-accent glow-text mb-4">
          {t.game.breachSim}
        </h3>

        {/* Stats bar */}
        <div className="flex items-center gap-4 sm:gap-6 mb-4 pb-3 border-b border-cyber-border font-mono text-sm" dir="ltr">
          <div>
            <span className="text-cyber-text-dim text-xs">{t.game.score}: </span>
            <span className="text-cyber-green">{score.toString().padStart(4, '0')}</span>
          </div>
          <div>
            <span className="text-cyber-text-dim text-xs">{t.game.lives}: </span>
            <span className="text-cyber-red">{'◆'.repeat(Math.max(0, lives))}{'◇'.repeat(Math.max(0, 3 - lives))}</span>
          </div>
          <div>
            <span className="text-cyber-text-dim text-xs">{t.game.status}: </span>
            <span className={gameState === 'playing' ? 'text-cyber-green' : 'text-cyber-amber'}>
              {statusLabel}
            </span>
          </div>
        </div>

        {gameState === 'ready' && (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-cyber-text mb-2">
              {t.game.threatsWill}
            </p>
            <p className="font-mono text-xs text-cyber-text-dim mb-6">
              {t.game.pressKey}
            </p>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
              {keyMap.map((k) => (
                <div key={k} className="border border-cyber-border font-mono text-xs text-cyber-accent-dim py-2 text-center">
                  {k.toUpperCase()}
                </div>
              ))}
            </div>
            <button onClick={startGame} className="btn-cyber">
              {t.game.startSim}
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-2 min-h-[200px]" dir="ltr">
            {threats.length === 0 && (
              <div className="font-mono text-xs text-cyber-text-dim text-center py-8">
                {t.game.scanning}
              </div>
            )}
            {threats.map((th) => (
              <div
                key={th.id}
                className="flex items-center justify-between border border-cyber-red/40 bg-cyber-red/5 px-3 py-2 font-mono text-xs animate-fade-in"
              >
                <span className="text-cyber-text">⚠ {t.threats[th.textKey]}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-cyber-border overflow-hidden">
                    <div
                      className="h-full bg-cyber-red transition-all duration-100"
                      style={{ width: `${(th.timeLeft / th.maxTime) * 100}%` }}
                    />
                  </div>
                  <span className="text-cyber-accent border border-cyber-accent/40 px-1.5 py-0.5 text-[10px]">
                    [{th.key.toUpperCase()}]
                  </span>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-3 border-t border-cyber-border font-mono text-[10px] text-cyber-text-dim space-y-0.5">
              {log.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'over' && (
          <div className="text-center py-12">
            <div className="font-mono text-lg text-cyber-red glow-text mb-2">
              {t.game.systemCompromised}
            </div>
            <p className="font-mono text-sm text-cyber-text mb-1">
              {t.game.finalScore}: <span className="text-cyber-green">{score}</span>
            </p>
            <p className="font-mono text-xs text-cyber-text-dim mb-6">
              {t.game.threatsNeutralized}: {Math.floor(score / 10)}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={startGame} className="btn-cyber">
                {t.game.restart}
              </button>
              <button onClick={onClose} className="btn-cyber">
                {t.game.exit}
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="mt-4 pt-3 border-t border-cyber-border">
            <div className="grid grid-cols-8 gap-1" dir="ltr">
              {keyMap.map((k) => (
                <div
                  key={k}
                  className={`text-center font-mono text-[10px] py-1 border transition-colors ${
                    threats.some((th) => th.key === k)
                      ? 'border-cyber-accent text-cyber-accent'
                      : 'border-cyber-border text-cyber-text-dim'
                  }`}
                >
                  {k.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
