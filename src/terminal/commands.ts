import { skills, interests } from '@/data/skills';
import type { Translation } from '@/i18n/translations';

export interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'error' | 'success' | 'system' | 'ascii';
}

export interface CommandResult {
  lines: TerminalLine[];
  clear?: boolean;
  launchGame?: boolean;
  matrixBoost?: boolean;
}

type CommandHandler = (args: string[], t: Translation, history: string[]) => CommandResult;

const nl = (text: string, type: TerminalLine['type'] = 'output'): TerminalLine => ({ text, type });

// All available command names (for autocomplete)
export const ALL_COMMANDS = [
  'help', 'clear', 'whoami', 'about', 'skills', 'projects', 'contact',
  'ls', 'pwd', 'date', 'echo', 'neofetch', 'grok', 'sudo', 'cat', 'game',
  'banner', 'uname', 'sysinfo', 'ping', 'scan', 'matrix', 'theme', 'history',
];

const helpText = (t: Translation): TerminalLine[] => {
  const cat = (label: string, cmds: [string, string][]): TerminalLine[] => [
    nl(`  ${label}`, 'system'),
    ...cmds.map(([cmd, desc]) => nl(`    ${cmd.padEnd(18)} ${desc}`)),
    nl(''),
  ];

  return [
    nl(t.terminal.helpAvailable, 'system'),
    nl(''),
    ...cat(t.terminal.helpCore, [
      ['help', t.terminal.cmdHelp],
      ['clear', t.terminal.cmdClear],
      ['history', t.terminal.cmdHistory],
      ['whoami', t.terminal.cmdWhoami],
      ['pwd', t.terminal.cmdPwd],
      ['date', t.terminal.cmdDate],
    ]),
    ...cat(t.terminal.helpSystem, [
      ['uname', t.terminal.cmdUname],
      ['sysinfo', t.terminal.cmdSysinfo],
      ['ping', t.terminal.cmdPing],
      ['scan', t.terminal.cmdScan],
    ]),
    ...cat(t.terminal.helpFun, [
      ['banner', t.terminal.cmdBanner],
      ['matrix', t.terminal.cmdMatrix],
      ['theme', t.terminal.cmdTheme],
      ['game', t.terminal.cmdGame],
      ['grok', t.terminal.cmdGrok],
    ]),
    ...cat(t.terminal.helpFiles, [
      ['ls', t.terminal.cmdLs],
      ['ls -a .grok', t.terminal.cmdLsGrok],
      ['cat', t.terminal.cmdCat],
      ['cat .grok/app-env.json', t.terminal.cmdCatGrok],
    ]),
    nl(t.terminal.helpHistory, 'system'),
  ];
};

const bannerText = (): TerminalLine[] => [
  nl('  ____  ___  __    ____  __ ___  ____  ____  ____  ____ ', 'ascii'),
  nl('  (  _ \\/ __)/  \\  (_  _)/ )(__ \\(_  _)(  __)/ __ \\(  _ \\', 'ascii'),
  nl('   ) __/ ( (  O )  )(  / /  / __/  )(   ) _(( (__) ))   /', 'ascii'),
  nl('  (__)  \\__)\\__/  (__) (_/  (____)(__) (____)\\____/(__\\_)', 'ascii'),
  nl('', 'ascii'),
  nl('  C Y B E R S E C U R I T Y   T E R M I N A L', 'system'),
];

const whoamiText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.whoamiLine1),
  nl(t.terminal.whoamiLine2),
  nl(t.terminal.whoamiLine3),
];

const aboutText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.systemProfile, 'system'),
  nl(''),
  nl(t.about.bio),
  nl(''),
  nl(t.terminal.interestsLabel, 'system'),
  ...interests.map((i) => nl(`  ◈ ${i}`)),
];

const skillsText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.techSkills, 'system'),
  nl(''),
  ...skills.map((s) => {
    const bars = Math.round(s.level / 10);
    const filled = '█'.repeat(bars);
    const empty = '░'.repeat(10 - bars);
    return nl(`  ${s.name.padEnd(22)} [${filled}${empty}] ${s.level}%`);
  }),
  nl(''),
  nl(t.terminal.radarHint, 'system'),
];

const projectsText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.projectDirectory, 'system'),
  nl(''),
  nl(t.terminal.projectEmpty, 'system'),
  nl(''),
  nl(`  STATUS: ${t.projects.awaiting}`, 'system'),
];

const contactText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.contactChannels, 'system'),
  nl(''),
  nl('  GitHub   : [your-github-username]'),
  nl('  Email    : [your-email@example.com]'),
  nl('  Other    : [your-other-link]'),
  nl(''),
  nl(t.terminal.replaceContact, 'system'),
  nl(t.terminal.useContactForm, 'system'),
];

const lsOutput = (args: string[]): TerminalLine[] => {
  const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
  const targetGrok = args.some((a) => a.includes('.grok'));

  if (targetGrok) {
    return [
      nl('.', 'system'),
      nl('..', 'system'),
      nl('app-env.json'),
      nl('core.log'),
      nl('identity.dat'),
      nl('shadow.cfg'),
    ];
  }

  if (showHidden) {
    return [
      nl('.', 'system'),
      nl('..', 'system'),
      nl('.grok', 'system'),
      nl('about', 'output'),
      nl('contact', 'output'),
      nl('projects', 'output'),
      nl('readme.txt', 'output'),
      nl('skills', 'output'),
    ];
  }

  return [
    nl('about/'),
    nl('contact/'),
    nl('projects/'),
    nl('readme.txt'),
    nl('skills/'),
  ];
};

const catOutput = (args: string[], t: Translation): TerminalLine[] => {
  const file = args.find((a) => !a.startsWith('-'));
  if (!file) return [nl(t.terminal.catMissing, 'error')];

  if (file === '.grok/app-env.json') {
    return [
      nl('{', 'output'),
      nl('  "system": "DOMINUS",', 'output'),
      nl('  "mode": "cyberpunk",', 'output'),
      nl('  "security": "active",', 'output'),
      nl('  "operator": "guest"', 'output'),
      nl('}', 'output'),
    ];
  }

  if (file === 'readme.txt') {
    return [
      nl(t.terminal.readmeContent1, 'system'),
      nl(''),
      nl(t.terminal.readmeContent2),
      nl(t.terminal.readmeContent3),
    ];
  }

  if (file === '.grok/core.log') {
    return [
      nl('[2025-01-01 00:00:01] GROK CORE initialized', 'system'),
      nl('[2025-01-01 00:00:02] Operator: guest', 'output'),
      nl('[2025-01-01 00:00:03] Security: active', 'output'),
      nl('[2025-01-01 00:00:04] Mode: cyberpunk', 'output'),
      nl('[2025-01-01 00:00:05] Awaiting input...', 'system'),
    ];
  }

  if (file === '.grok/identity.dat') {
    return [
      nl('IDENTITY: DOMINUS LUPORUM', 'system'),
      nl('CLEARANCE: UNKNOWN', 'output'),
      nl('STATUS: ACTIVE', 'output'),
    ];
  }

  if (file === '.grok/shadow.cfg') {
    return [
      nl('# shadow.cfg — fictional configuration', 'system'),
      nl('enable_ghost_mode = true', 'output'),
      nl('trace_level = 0', 'output'),
      nl('persist = false', 'output'),
    ];
  }

  return [nl(`cat: ${file}: ${t.terminal.catNotFound}`, 'error')];
};

const neofetchText = (): TerminalLine[] => [
  nl('       /\\         guest@dominus', 'success'),
  nl('      /  \\        ---------------', 'success'),
  nl('     / /\\ \\       OS: Linux (simulated)', 'success'),
  nl('    / ____ \\      Kernel: 6.x.terminal', 'success'),
  nl('   /_/    \\_\\     Shell: dominus-sh 1.0', 'success'),
  nl('                 DE: Cyberpunk-Terminal', 'success'),
  nl('                 Focus: Cybersecurity', 'success'),
  nl('                 Langs: Python / C / Bash', 'success'),
  nl('                 Uptime: ∞', 'success'),
];

const grokText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.grokCore, 'success'),
  nl(''),
  nl(t.terminal.grokAnalyzing, 'system'),
  nl(''),
  nl(t.terminal.grokPortfolio),
  nl(t.terminal.grokOperator),
  nl(t.terminal.grokSecurity),
  nl(''),
  nl(t.terminal.grokDisclaimer, 'system'),
];

const sudoReviveText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.sudoPermission, 'success'),
  nl(''),
  nl(t.terminal.sudoRestored, 'success'),
  nl(t.terminal.sudoNominal),
  nl(t.terminal.sudoDisclaimer, 'system'),
];

const dateText = (): TerminalLine[] => {
  return [nl(new Date().toString())];
};

const pwdText = (): TerminalLine[] => [
  nl('/home/guest/dominus'),
];

const echoText = (args: string[]): TerminalLine[] => {
  return [nl(args.join(' '))];
};

const unameText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.unameSystem, 'system'),
  nl(t.terminal.unameArch),
  nl(t.terminal.unameEnv),
  nl(t.terminal.unameSec),
];

const sysinfoText = (t: Translation): TerminalLine[] => [
  nl('═══ SYSTEM INFO ═══', 'system'),
  nl(''),
  nl(`  ${t.terminal.sysinfoOS}`),
  nl(`  ${t.terminal.sysinfoKernel}`),
  nl(`  ${t.terminal.sysinfoShell}`),
  nl(`  ${t.terminal.sysinfoStatus}`, 'success'),
];

const pingText = (t: Translation): TerminalLine[] => {
  const lines: TerminalLine[] = [
    nl(t.terminal.pingSim),
  ];
  for (let i = 0; i < 4; i++) {
    const time = (Math.random() * 0.3 + 0.05).toFixed(3);
    lines.push(nl(`64 bytes from 127.0.0.1: icmp_seq=${i + 1} ttl=64 time=${time} ms`));
  }
  lines.push(nl(''));
  lines.push(nl(t.terminal.pingStats, 'system'));
  lines.push(nl('4 packets transmitted, 4 received, 0% packet loss', 'success'));
  return lines;
};

const scanText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.scanInit, 'system'),
  nl(''),
  nl('[####------] 40%', 'system'),
  nl('[########--] 80%', 'system'),
  nl(t.terminal.scanComplete1, 'success'),
  nl(''),
  nl(t.terminal.scanNoThreats, 'success'),
  nl(t.terminal.scanComplete, 'success'),
  nl(''),
  nl(t.terminal.scanDisclaimer, 'system'),
];

const matrixText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.matrixActivate, 'success'),
  nl(t.terminal.matrixDisclaimer, 'system'),
  { text: '', type: 'output', matrixBoost: true } as TerminalLine & { matrixBoost?: boolean },
] as TerminalLine[];

const themeText = (t: Translation): TerminalLine[] => [
  nl(t.terminal.themeAvailable, 'system'),
  nl(''),
  nl(`  ${t.terminal.themeCyberpunk}`, 'output'),
  nl(''),
  nl(`${t.terminal.themeCurrent} cyberpunk`, 'system'),
];

const historyText = (history: string[], t: Translation): TerminalLine[] => {
  if (history.length === 0) return [nl(t.terminal.historyEmpty, 'system')];
  return history.map((cmd, i) => nl(`  ${String(i + 1).padStart(3)}  ${cmd}`));
};

const commands: Record<string, CommandHandler> = {
  help: (_a, t) => ({ lines: helpText(t) }),
  clear: () => ({ lines: [], clear: true }),
  whoami: (_a, t) => ({ lines: whoamiText(t) }),
  about: (_a, t) => ({ lines: aboutText(t) }),
  skills: (_a, t) => ({ lines: skillsText(t) }),
  projects: (_a, t) => ({ lines: projectsText(t) }),
  contact: (_a, t) => ({ lines: contactText(t) }),
  ls: (args) => ({ lines: lsOutput(args) }),
  pwd: () => ({ lines: pwdText() }),
  date: () => ({ lines: dateText() }),
  echo: (args) => ({ lines: echoText(args) }),
  neofetch: () => ({ lines: neofetchText() }),
  grok: (_a, t) => ({ lines: grokText(t) }),
  game: (_a, t) => ({ lines: [nl(t.terminal.launchingGame, 'system')], launchGame: true }),
  cat: (args, _t, _h) => ({ lines: catOutput(args, _t) }),
  sudo: (args, t) => {
    if (args[0] === 'revive') return { lines: sudoReviveText(t) };
    return { lines: [nl(`sudo: ${args.join(' ')}: ${t.terminal.sudoNotFound}`, 'error')] };
  },
  banner: () => ({ lines: bannerText() }),
  uname: (_a, t) => ({ lines: unameText(t) }),
  sysinfo: (_a, t) => ({ lines: sysinfoText(t) }),
  ping: (_a, t) => ({ lines: pingText(t) }),
  scan: (_a, t) => ({ lines: scanText(t) }),
  matrix: (_a, t) => ({ lines: matrixText(t), matrixBoost: true }),
  theme: (_a, t) => ({ lines: themeText(t) }),
  history: (_a, t, h) => ({ lines: historyText(h, t) }),
};

export function executeCommand(
  input: string,
  t: Translation,
  history: string[]
): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (handler) return handler(args, t, history);

  return { lines: [nl(`bash: ${cmd}: ${t.terminal.commandNotFound}`, 'error')] };
}

// Autocomplete: returns matching command prefix
export function autocomplete(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    const matches = ALL_COMMANDS.filter((c) => c.startsWith(parts[0]));
    if (matches.length === 1) return matches[0];
    if (matches.length > 1) return null;
  }
  return null;
}

export function getCompletions(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return ALL_COMMANDS.filter((c) => c.startsWith(parts[0]));
  }
  return [];
}
