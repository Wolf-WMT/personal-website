import { Terminal, FolderGit2 } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function Hero() {
  const { t, rtl } = useLang();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-14"
      aria-label={t.nav.home}
    >
      <div className="max-w-6xl w-full grid lg:grid-cols-5 gap-8 items-center">
        {/* Left: Title and intro */}
        <div className="lg:col-span-3 animate-slide-up">
          <div className="font-mono text-xs text-cyber-text-dim mb-4 tracking-widest">
            <span className="text-cyber-green">●</span> {t.hero.connectionEstablished}
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-wider text-cyber-accent glow-text mb-3" dir="ltr">
            DOMINUS LUPORUM
          </h1>

          <p className="font-mono text-sm sm:text-base text-cyber-text-dim tracking-wide mb-6" dir="ltr">
            {t.hero.subtitle.cybersecurity} <span className="text-cyber-green">•</span>{' '}
            {t.hero.subtitle.malwareAnalysis} <span className="text-cyber-green">•</span>{' '}
            {t.hero.subtitle.python} <span className="text-cyber-green">•</span>{' '}
            {t.hero.subtitle.linux}
          </p>

          <p className="font-mono text-sm sm:text-base text-cyber-text max-w-xl leading-relaxed mb-8">
            {t.hero.intro}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('#projects')}
              className="btn-cyber flex items-center gap-2"
            >
              <FolderGit2 className="w-4 h-4" />
              {t.hero.exploreProjects}
            </button>
            <button
              onClick={() => scrollTo('#terminal')}
              className="btn-cyber flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              {t.hero.openTerminal}
            </button>
          </div>
        </div>

        {/* Right: System status panel */}
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="glass-panel glow-border p-5 sm:p-6 font-mono" dir="ltr">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-border">
              <span className="text-xs tracking-widest text-cyber-text-dim">{t.hero.systemStatus}</span>
              <span className="flex items-center gap-1.5 text-xs text-cyber-green">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-glow-pulse" />
                {t.hero.online}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="data-line">
                <span className="data-label">OS:</span>
                <span className="data-value">{t.hero.os}</span>
              </div>
              <div className="data-line">
                <span className="data-label">FOCUS:</span>
                <span className="data-value">{t.hero.focus}</span>
              </div>
              <div className="data-line">
                <span className="data-label">LANG:</span>
                <span className="data-value">{t.hero.lang}</span>
              </div>
              <div className="data-line">
                <span className="data-label">STATUS:</span>
                <span className="data-value text-cyber-green">{t.hero.status}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-cyber-border text-xs text-cyber-text-dim">
              <span className="text-cyber-accent">guest@dominus</span>
              <span className="text-cyber-text-dim">:~$ </span>
              <span className="inline-block w-2 h-3.5 bg-cyber-accent animate-blink align-middle" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-cyber-text-dim animate-float hidden sm:block ${rtl ? 'flex-row-reverse' : ''}`}>
        {t.hero.scroll}
      </div>
    </section>
  );
}
