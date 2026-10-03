import { useLang } from '@/i18n/LanguageContext';
import { Database, FolderOpen } from 'lucide-react';

export default function Projects() {
  const { t, rtl } = useLang();

  return (
    <section id="projects" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.nav.projects}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[03]</span>
          <h2 className="section-label">{t.projects.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        {/* Empty state */}
        <div className="glass-panel p-10 sm:p-16 text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 border border-cyber-border flex items-center justify-center text-cyber-accent-dim">
            <Database className="w-8 h-8" />
          </div>

          <div className="font-mono text-xs text-cyber-text-dim tracking-widest mb-3">
            {t.projects.database}
          </div>

          <h3 className="font-display font-semibold text-xl text-cyber-text mb-2">
            {t.projects.empty}
          </h3>

          <p className="font-mono text-sm text-cyber-text-dim max-w-md mx-auto mb-8">
            {t.projects.willAppear}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyber-amber/30 bg-cyber-amber/5">
            <FolderOpen className="w-3.5 h-3.5 text-cyber-amber" />
            <span className="font-mono text-xs text-cyber-amber tracking-widest">
              {t.projects.status}: {t.projects.awaiting}
            </span>
          </div>
        </div>

        {/* Architecture hint */}
        <div className={`mt-4 font-mono text-[10px] text-cyber-text-dim ${rtl ? 'text-right' : 'text-center'}`}>
          // {t.projects.willAppear}
        </div>
      </div>
    </section>
  );
}
