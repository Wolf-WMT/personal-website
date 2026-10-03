import { Terminal } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative px-4 sm:px-6 py-8 border-t border-cyber-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-cyber-text-dim">
        <div className="flex items-center gap-2" dir="ltr">
          <Terminal className="w-3.5 h-3.5 text-cyber-accent" />
          <span>DOMINUS_LUPORUM</span>
        </div>
        <div dir="ltr">
          <span className="text-cyber-green">●</span> {t.footer.systemOnline} —{' '}
          <span className="text-cyber-text-dim">{new Date().getFullYear()}</span>
        </div>
        <div dir="ltr">
          {t.footer.builtWith}
        </div>
      </div>
    </footer>
  );
}
