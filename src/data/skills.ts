export interface Skill {
  name: string;
  level: number;
  description: string;
  category: 'core' | 'web' | 'security' | 'systems';
}

export const skills: Skill[] = [
  { name: 'Python', level: 85, description: 'Primary language — scripting, automation, tooling, and security utilities.', category: 'core' },
  { name: 'Linux', level: 82, description: 'Daily driver OS — shell scripting, system administration, and hardening.', category: 'systems' },
  { name: 'HTML', level: 60, description: 'Semantic markup and page structure for web interfaces.', category: 'web' },
  { name: 'CSS', level: 55, description: 'Styling, layout, and responsive design fundamentals.', category: 'web' },
  { name: 'C', level: 40, description: 'Low-level programming — memory management and systems code.', category: 'systems' },
  { name: 'Cybersecurity', level: 65, description: 'Threat analysis, defensive security, and system hardening practices.', category: 'security' },
  { name: 'Malware Analysis', level: 38, description: 'Static and dynamic analysis of suspicious binaries in sandboxed environments.', category: 'security' },
  { name: 'Reverse Engineering', level: 35, description: 'Disassembly and behavior study of compiled programs using analysis tools.', category: 'security' },
];

export const interests = [
  'Cybersecurity',
  'Malware Analysis',
  'Linux',
  'Python',
  'C',
  'Reverse Engineering',
  'System Security',
];
