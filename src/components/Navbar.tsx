import { useState, useEffect } from 'react';
import { Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { type Language, languageLabels } from '@/i18n/translations';
import MusicController from './MusicController';

export default function Navbar() {
  const { t, lang, setLang, rtl } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.nav.home, href: '#hero' },
    { key: 'about', label: t.nav.about, href: '#about' },
    { key: 'skills', label: t.nav.skills, href: '#skills' },
    { key: 'projects', label: t.nav.projects, href: '#projects' },
    { key: 'playlist', label: t.nav.playlist, href: '#playlist' },
    { key: 'terminal', label: t.nav.terminal, href: '#terminal' },
    { key: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const item of navItems) {
        const el = document.getElementById(item.href.slice(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.key);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLangSelect = (next: Language) => {
    setLang(next);
    setLangOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
          scrolled
            ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border'
            : 'bg-transparent border-b border-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-2">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="flex items-center gap-2 text-cyber-accent font-display font-bold tracking-widest text-sm flex-shrink-0"
          >
            <TerminalIcon className="w-4 h-4" />
            <span className="hidden sm:inline">DOMINUS_LUPORUM</span>
            <span className="sm:hidden">DL</span>
          </a>

          {/* Nav items - desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`px-2.5 py-1.5 text-[11px] tracking-widest font-mono transition-all duration-200 border-b-2 ${
                    activeSection === item.key
                      ? 'text-cyber-accent border-cyber-accent'
                      : 'text-cyber-text-dim border-transparent hover:text-cyber-accent hover:border-cyber-border'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Controls: Language + Music + Mobile menu button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="px-2 py-1 text-[11px] font-mono tracking-widest border border-cyber-border text-cyber-text-dim hover:text-cyber-accent hover:border-cyber-accent transition-all"
                aria-label={t.controls.language}
                aria-expanded={langOpen}
              >
                {languageLabels[lang]}
              </button>
              {langOpen && (
                <div className={`absolute top-full mt-1 ${rtl ? 'left-0' : 'right-0'} bg-cyber-panel border border-cyber-border z-[10001] flex flex-col`}>
                  {(['en', 'fa', 'ru'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangSelect(l)}
                      className={`px-4 py-1.5 text-[11px] font-mono tracking-widest transition-colors ${
                        lang === l ? 'text-cyber-accent bg-cyber-accent/5' : 'text-cyber-text-dim hover:text-cyber-accent'
                      }`}
                    >
                      {languageLabels[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Music controller - hidden on small screens (shown in mobile menu) */}
            <div className="hidden sm:block">
              <MusicController />
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-cyber-accent p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[8999] bg-cyber-bg/95 backdrop-blur-lg lg:hidden flex flex-col items-center justify-center gap-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.href)}
              className={`text-lg font-display tracking-widest transition-colors ${
                activeSection === item.key ? 'text-cyber-accent' : 'text-cyber-text-dim hover:text-cyber-accent'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4">
            <MusicController />
          </div>
        </div>
      )}
    </>
  );
}
