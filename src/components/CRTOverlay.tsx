import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';

export default function CRTOverlay() {
  const { t } = useLang();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('crt-mode');
    if (stored === 'true') setEnabled(true);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('crt-mode', String(next));
  };

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-4 right-4 z-[10000] btn-cyber !py-1.5 !px-3 !text-xs"
        aria-pressed={enabled}
        aria-label={t.controls.crtMode}
        title={t.controls.crtMode}
      >
        <span className={enabled ? 'text-cyber-green' : 'text-cyber-accent'}>
          {enabled ? t.controls.crtOn : t.controls.crtMode}
        </span>
      </button>
      {enabled && (
        <>
          <div className="crt-scanlines" aria-hidden="true" />
          <div className="crt-vignette" aria-hidden="true" />
          <div className="scanline-moving" aria-hidden="true" />
          <div className="fixed inset-0 pointer-events-none crt-flicker" style={{ zIndex: 9996 }} aria-hidden="true" />
        </>
      )}
    </>
  );
}
