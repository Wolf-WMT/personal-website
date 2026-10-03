import { useState } from 'react';
import { skills, type Skill } from '@/data/skills';
import { useLang } from '@/i18n/LanguageContext';

export default function SkillsRadar() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<Skill | null>(null);

  const size = 360;
  const center = size / 2;
  const maxRadius = 130;
  const levels = 5;
  const n = skills.length;

  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const pointFor = (skill: Skill, radius: number) => {
    const angle = angleFor(skills.indexOf(skill));
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const dataPoints = skills.map((s) => pointFor(s, (s.level / 100) * maxRadius));

  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (maxRadius / levels) * (level + 1);
    const pts = skills.map((_, i) => {
      const angle = angleFor(i);
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    });
    return pts.join(' ');
  });

  const labelPoints = skills.map((s, i) => {
    const angle = angleFor(i);
    const r = maxRadius + 28;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      skill: s,
    };
  });

  return (
    <section id="skills" className="relative px-4 sm:px-6 py-20 sm:py-28" aria-label={t.nav.skills}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-cyber-accent font-mono text-sm">[02]</span>
          <h2 className="section-label">{t.skills.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-border to-transparent" />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-center">
          {/* Radar chart */}
          <div className="lg:col-span-3 glass-panel p-6 flex items-center justify-center animate-fade-in">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full max-w-[400px] h-auto"
              role="img"
              aria-label="Technical skills radar chart"
            >
              {gridPolygons.map((pts, i) => (
                <polygon key={i} points={pts} fill="none" stroke="#1a2823" strokeWidth="1" />
              ))}

              {skills.map((_, i) => {
                const angle = angleFor(i);
                return (
                  <line
                    key={i}
                    x1={center} y1={center}
                    x2={center + maxRadius * Math.cos(angle)}
                    y2={center + maxRadius * Math.sin(angle)}
                    stroke="#1a2823" strokeWidth="1"
                  />
                );
              })}

              <polygon
                points={dataPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="rgba(34, 211, 238, 0.08)"
                stroke="#22d3ee"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.3))' }}
              />

              {dataPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x} cy={p.y}
                  r={hovered === skills[i] ? 6 : 4}
                  fill="#22d3ee"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHovered(skills[i])}
                  onMouseLeave={() => setHovered(null)}
                  style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))' }}
                />
              ))}

              {labelPoints.map((lp) => (
                <text
                  key={lp.skill.name}
                  x={lp.x} y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-mono"
                  fontSize="11"
                  fill={hovered === lp.skill ? '#22d3ee' : '#6b7280'}
                  style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                  onMouseEnter={() => setHovered(lp.skill)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {lp.skill.name}
                </text>
              ))}
            </svg>
          </div>

          {/* Skill details */}
          <div className="lg:col-span-2 space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="glass-panel p-5 min-h-[140px]">
              {hovered ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-cyber-accent tracking-widest" dir="ltr">
                      {hovered.name.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-cyber-text-dim">
                      {hovered.level}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-cyber-border mb-3 overflow-hidden">
                    <div
                      className="h-full bg-cyber-accent transition-all duration-300"
                      style={{ width: `${hovered.level}%`, boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}
                    />
                  </div>
                  <p className="font-mono text-xs text-cyber-text leading-relaxed">
                    {hovered.description}
                  </p>
                </div>
              ) : (
                <div className="font-mono text-xs text-cyber-text-dim leading-relaxed">
                  <span className="text-cyber-accent">{t.skills.hoverInterrogate}</span>
                  <br />
                  {t.skills.hoverHint}
                </div>
              )}
            </div>

            {/* Skill bars */}
            <div className="glass-panel p-5">
              <div className="font-mono text-xs text-cyber-text-dim mb-3 tracking-widest">
                {t.skills.proficiencyLevels}
              </div>
              <div className="space-y-2">
                {skills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-2 cursor-pointer group"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(null)}
                    dir="ltr"
                  >
                    <span className="font-mono text-[10px] text-cyber-text-dim w-20 truncate group-hover:text-cyber-accent transition-colors">
                      {s.name}
                    </span>
                    <div className="flex-1 h-1 bg-cyber-border overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${hovered === s ? 'bg-cyber-accent' : 'bg-cyber-accent-dim'}`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
