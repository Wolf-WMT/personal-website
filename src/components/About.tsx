import { useLang } from '@/i18n/LanguageContext';
import { interests } from '@/data/skills';

export default function About() {
  const { t, rtl } = useLang();

  return (
    <section id="about" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.nav.about}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[01]</span>
          <h2 className="section-label">{t.about.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile text */}
          <div className="glass-panel p-6 animate-fade-in">
            <div className="font-mono text-xs text-cyber-text-dim mb-3 tracking-widest">
              {t.about.profileData}
            </div>
            <p className="font-mono text-sm text-cyber-text leading-relaxed">
              {t.about.bio}
            </p>
            <div className="mt-5 pt-4 border-t border-cyber-border">
              <div className="font-mono text-xs text-cyber-text-dim mb-2 tracking-widest">
                {t.about.classification}
              </div>
              <div className="inline-block px-2 py-0.5 border border-cyber-amber/30 text-cyber-amber text-xs font-mono tracking-widest" dir="ltr">
                {t.about.unclassified}
              </div>
            </div>
          </div>

          {/* Interests panel */}
          <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-xs text-cyber-text-dim mb-3 tracking-widest">
              {t.about.interests}
            </div>
            <ul className="space-y-2.5">
              {interests.map((interest, i) => (
                <li
                  key={interest}
                  className="font-mono text-sm flex items-center gap-3 group cursor-default"
                  dir="ltr"
                >
                  <span className="text-cyber-accent text-xs w-6">
                    {String(i).padStart(2, '0')}
                  </span>
                  <span className="text-cyber-accent group-hover:glow-text transition-all">
                    ◈
                  </span>
                  <span className="text-cyber-text group-hover:text-cyber-accent transition-colors">
                    {interest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
