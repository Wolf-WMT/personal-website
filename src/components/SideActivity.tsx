import { Gamepad2 } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function SideActivity() {
  const { t, rtl } = useLang();

  return (
    <section className="relative px-4 sm:px-6 py-12" aria-label={t.sideActivity.label}>
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel p-5 flex items-center gap-4 sm:gap-6 animate-fade-in">
          <div className="w-12 h-12 sm:w-14 sm:h-14 border border-cyber-border flex items-center justify-center text-cyber-accent-dim flex-shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-0.5">
              {t.sideActivity.label}
            </div>
            <div className="font-display font-semibold text-base text-cyber-text" dir="ltr">
              {t.sideActivity.dota2}
            </div>
            <div className="font-mono text-xs text-cyber-text-dim" dir="ltr">
              {t.sideActivity.hours}
            </div>
          </div>
          <div className="hidden sm:block font-mono text-[10px] text-cyber-text-dim text-right" dir="ltr">
            <div>STATUS: <span className="text-cyber-green">{t.sideActivity.recreational}</span></div>
            <div>PRIORITY: <span className="text-cyber-text-dim">{t.sideActivity.low}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
