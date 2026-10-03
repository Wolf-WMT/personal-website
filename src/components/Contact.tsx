import { useState } from 'react';
import { Send, Github, Mail, Link as LinkIcon, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function Contact() {
  const { t, rtl } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = t.contact.nameRequired;
    if (!form.email.trim()) {
      e.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.contact.emailInvalid;
    }
    if (!form.message.trim()) {
      e.message = t.contact.messageRequired;
    } else if (form.message.trim().length < 10) {
      e.message = t.contact.messageShort;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contactLinks = [
    { icon: Github, label: t.contact.github, value: '[your-github-username]', href: '#' },
    { icon: Mail, label: 'Email', value: '[your-email@example.com]', href: '#' },
    { icon: LinkIcon, label: t.contact.other, value: '[your-other-link]', href: '#' },
  ];

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.nav.contact}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[07]</span>
          <h2 className="section-label">{t.contact.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact channels */}
          <div className="glass-panel p-6 animate-fade-in">
            <div className="font-mono text-xs text-cyber-text-dim mb-4 tracking-widest">
              {t.contact.channels}
            </div>
            <ul className="space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 border border-cyber-border flex items-center justify-center text-cyber-accent group-hover:border-cyber-accent group-hover:glow-border transition-all flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest" dir="ltr">
                          {link.label.toUpperCase()}
                        </div>
                        <div className="font-mono text-sm text-cyber-text group-hover:text-cyber-accent transition-colors" dir="ltr">
                          {link.value}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 pt-4 border-t border-cyber-border font-mono text-[10px] text-cyber-text-dim">
              {t.contact.replaceInfo}
            </p>
          </div>

          {/* Contact form */}
          <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-xs text-cyber-text-dim mb-4 tracking-widest" dir="ltr">
              {t.contact.initialize}
            </div>

            {submitted && (
              <div className="mb-4 flex items-center gap-2 border border-cyber-green/40 bg-cyber-green/5 px-3 py-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-cyber-green flex-shrink-0" />
                <span className="font-mono text-xs text-cyber-green">
                  {t.contact.success}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs text-cyber-text-dim mb-1 tracking-widest">
                  {t.contact.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-cyber-panel border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text focus:border-cyber-accent focus:outline-none focus:glow-border transition-all"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 flex items-center gap-1 font-mono text-[10px] text-cyber-red">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs text-cyber-text-dim mb-1 tracking-widest">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-cyber-panel border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text focus:border-cyber-accent focus:outline-none focus:glow-border transition-all"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 flex items-center gap-1 font-mono text-[10px] text-cyber-red">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs text-cyber-text-dim mb-1 tracking-widest">
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-cyber-panel border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text focus:border-cyber-accent focus:outline-none focus:glow-border transition-all resize-none"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 flex items-center gap-1 font-mono text-[10px] text-cyber-red">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" /> {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-cyber w-full flex items-center justify-center gap-2">
                <Send className="w-3.5 h-3.5" />
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
