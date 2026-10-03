export type Language = 'en' | 'fa' | 'ru';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    playlist: string;
    terminal: string;
    contact: string;
  };
  // Hero
  hero: {
    connectionEstablished: string;
    subtitle: { cybersecurity: string; malwareAnalysis: string; python: string; linux: string };
    intro: string;
    exploreProjects: string;
    openTerminal: string;
    systemStatus: string;
    online: string;
    os: string;
    focus: string;
    lang: string;
    status: string;
    scroll: string;
  };
  // About
  about: {
    title: string;
    profileData: string;
    bio: string;
    classification: string;
    unclassified: string;
    interests: string;
  };
  // Skills
  skills: {
    title: string;
    hoverInterrogate: string;
    hoverHint: string;
    proficiencyLevels: string;
  };
  // Projects
  projects: {
    title: string;
    database: string;
    empty: string;
    willAppear: string;
    awaiting: string;
    status: string;
  };
  // Playlist
  playlist: {
    title: string;
    currentlyListening: string;
    nowPlaying: string;
    all: string;
    favorites: string;
    recent: string;
    genre: string;
    listen: string;
    placeholder: string;
    track: string;
    artist: string;
    album: string;
    noTracks: string;
    addTracksHere: string;
  };
  // Terminal
  terminal: {
    title: string;
    lastLogin: string;
    typeHelp: string;
    clickToFocus: string;
    tryCommands: string;
    commandNotFound: string;
    // Help categories
    helpAvailable: string;
    helpCore: string;
    helpSystem: string;
    helpFun: string;
    helpFiles: string;
    helpHistory: string;
    // Command descriptions
    cmdHelp: string;
    cmdClear: string;
    cmdWhoami: string;
    cmdPwd: string;
    cmdDate: string;
    cmdAbout: string;
    cmdSkills: string;
    cmdProjects: string;
    cmdContact: string;
    cmdUname: string;
    cmdSysinfo: string;
    cmdPing: string;
    cmdScan: string;
    cmdBanner: string;
    cmdMatrix: string;
    cmdTheme: string;
    cmdGame: string;
    cmdGrok: string;
    cmdLs: string;
    cmdLsGrok: string;
    cmdCat: string;
    cmdCatGrok: string;
    cmdEcho: string;
    cmdNeofetch: string;
    cmdHistory: string;
    // Output strings
    whoamiLine1: string;
    whoamiLine2: string;
    whoamiLine3: string;
    systemProfile: string;
    interestsLabel: string;
    techSkills: string;
    radarHint: string;
    projectDirectory: string;
    projectEmpty: string;
    contactChannels: string;
    replaceContact: string;
    useContactForm: string;
    catMissing: string;
    catNotFound: string;
    readmeContent1: string;
    readmeContent2: string;
    readmeContent3: string;
    grokCore: string;
    grokAnalyzing: string;
    grokPortfolio: string;
    grokOperator: string;
    grokSecurity: string;
    grokDisclaimer: string;
    sudoPermission: string;
    sudoRestored: string;
    sudoNominal: string;
    sudoDisclaimer: string;
    sudoNotFound: string;
    launchingGame: string;
    useArrows: string;
    // New commands
    bannerText: string;
    unameSystem: string;
    unameArch: string;
    unameEnv: string;
    unameSec: string;
    sysinfoOS: string;
    sysinfoKernel: string;
    sysinfoShell: string;
    sysinfoStatus: string;
    scanInit: string;
    scanComplete1: string;
    scanNoThreats: string;
    scanComplete: string;
    scanDisclaimer: string;
    pingSim: string;
    pingStats: string;
    matrixActivate: string;
    matrixDeactivate: string;
    matrixDisclaimer: string;
    themeAvailable: string;
    themeCurrent: string;
    themeCyberpunk: string;
    historyEmpty: string;
    unknownTheme: string;
  };
  // Contact
  contact: {
    title: string;
    channels: string;
    initialize: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
    messageShort: string;
    replaceInfo: string;
    github: string;
    other: string;
  };
  // Side Activity
  sideActivity: {
    label: string;
    dota2: string;
    hours: string;
    recreational: string;
    low: string;
  };
  // Mini Game
  game: {
    breachSim: string;
    threatsWill: string;
    pressKey: string;
    startSim: string;
    scanning: string;
    neutralized: string;
    threatEscaped: string;
    systemCompromised: string;
    finalScore: string;
    threatsNeutralized: string;
    restart: string;
    exit: string;
    score: string;
    lives: string;
    status: string;
    ready: string;
    playing: string;
    over: string;
    closeGame: string;
    systemInit: string;
    defendThreats: string;
  };
  // Controls
  controls: {
    crtMode: string;
    crtOn: string;
    musicOn: string;
    musicOff: string;
    language: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    volume: string;
    prev: string;
    next: string;
  };
  // Footer
  footer: {
    systemOnline: string;
    builtWith: string;
  };
  // Threat texts for game
  threats: {
    intrusion: string;
    malware: string;
    portScan: string;
    bruteForce: string;
    dataExfil: string;
    rootkit: string;
    phishing: string;
    exploit: string;
  };
}

const en: Translation = {
  nav: {
    home: 'HOME', about: 'ABOUT', skills: 'SKILLS', projects: 'PROJECTS',
    playlist: 'PLAYLIST', terminal: 'TERMINAL', contact: 'CONTACT',
  },
  hero: {
    connectionEstablished: 'CONNECTION ESTABLISHED',
    subtitle: { cybersecurity: 'Cybersecurity', malwareAnalysis: 'Malware Analysis', python: 'Python', linux: 'Linux' },
    intro: 'Developer and cybersecurity enthusiast focused on understanding systems, analyzing software, and building secure solutions.',
    exploreProjects: 'Explore Projects',
    openTerminal: 'Open Terminal',
    systemStatus: '## SYSTEM STATUS',
    online: 'ONLINE',
    os: 'Linux / Windows',
    focus: 'Cybersecurity',
    lang: 'Python / C',
    status: 'ONLINE',
    scroll: '▼ scroll',
  },
  about: {
    title: 'ABOUT_ME',
    profileData: '// PROFILE_DATA',
    bio: "I'm a developer and cybersecurity enthusiast interested in Linux, Python, low-level programming, malware analysis, reverse engineering, and understanding how software and systems work.",
    classification: '// CLASSIFICATION',
    unclassified: 'UNCLASSIFIED // OPEN PROFILE',
    interests: '// INTERESTS',
  },
  skills: {
    title: 'SKILLS_MATRIX',
    hoverInterrogate: '// HOVER_INTERROGATE',
    hoverHint: 'Hover over any skill node to view detailed information.',
    proficiencyLevels: '// PROFICIENCY_LEVELS',
  },
  projects: {
    title: 'PROJECTS',
    database: 'PROJECT DATABASE',
    empty: 'Currently empty.',
    willAppear: 'Real projects will appear here as they are completed.',
    awaiting: 'AWAITING PROJECTS',
    status: 'STATUS',
  },
  playlist: {
    title: 'MY PLAYLIST',
    currentlyListening: 'Currently listening',
    nowPlaying: 'NOW PLAYING',
    all: 'ALL',
    favorites: 'FAVORITES',
    recent: 'RECENT',
    genre: 'GENRE',
    listen: 'LISTEN',
    placeholder: 'PLACEHOLDER',
    track: 'Track',
    artist: 'Artist',
    album: 'Album',
    noTracks: 'No tracks available.',
    addTracksHere: 'Add your favorite tracks to the playlist data file.',
  },
  terminal: {
    title: 'TERMINAL',
    lastLogin: 'Last login:',
    typeHelp: 'Type "help" for available commands.',
    clickToFocus: '// Click terminal to focus.',
    tryCommands: 'Try: help, neofetch, grok, sudo revive, game',
    commandNotFound: 'command not found',
    helpAvailable: 'AVAILABLE COMMANDS',
    helpCore: 'CORE',
    helpSystem: 'SYSTEM',
    helpFun: 'FUN',
    helpFiles: 'FILES',
    helpHistory: 'Use ↑/↓ arrows to navigate command history. TAB for autocomplete.',
    cmdHelp: 'Show this help message',
    cmdClear: 'Clear the terminal screen',
    cmdWhoami: 'Display operator identity',
    cmdPwd: 'Print working directory',
    cmdDate: 'Show current system date/time',
    cmdAbout: 'Display system profile',
    cmdSkills: 'List technical skills',
    cmdProjects: 'List available projects',
    cmdContact: 'Show contact information',
    cmdUname: 'Show system information',
    cmdSysinfo: 'Show detailed system info',
    cmdPing: 'Simulate network ping',
    cmdScan: 'Run fictional security scan',
    cmdBanner: 'Display ASCII banner',
    cmdMatrix: 'Intensify Matrix effect',
    cmdTheme: 'Show available themes',
    cmdGame: 'Launch BREACH SIMULATION',
    cmdGrok: '[CLASSIFIED] Query AI core',
    cmdLs: 'List directory contents',
    cmdLsGrok: '[EASTER EGG] List hidden files',
    cmdCat: 'Read file contents',
    cmdCatGrok: '[EASTER EGG] Read hidden config',
    cmdEcho: 'Display text',
    cmdNeofetch: 'System information summary',
    cmdHistory: 'Show command history',
    whoamiLine1: 'dominus',
    whoamiLine2: 'Cybersecurity enthusiast',
    whoamiLine3: 'Python / Linux developer',
    systemProfile: '═══ SYSTEM PROFILE ═══',
    interestsLabel: 'INTERESTS:',
    techSkills: '═══ TECHNICAL SKILLS ═══',
    radarHint: 'Hover the radar chart for detailed descriptions.',
    projectDirectory: '═══ PROJECT DIRECTORY ═══',
    projectEmpty: '  No projects available yet.',
    contactChannels: '═══ CONTACT CHANNELS ═══',
    replaceContact: 'Replace placeholders with your actual contact info.',
    useContactForm: 'Or use the contact form in the CONTACT section.',
    catMissing: 'cat: missing file operand',
    catNotFound: 'No such file or directory',
    readmeContent1: '═══ DOMINUS LUPORUM ═══',
    readmeContent2: 'Interactive cybersecurity portfolio terminal.',
    readmeContent3: 'Type "help" for available commands.',
    grokCore: '[GROK CORE ONLINE]',
    grokAnalyzing: 'Analyzing system...',
    grokPortfolio: 'Portfolio detected.',
    grokOperator: 'Operator status: ACTIVE.',
    grokSecurity: 'Security posture: NOMINAL.',
    grokDisclaimer: '> This is a fictional AI response — no external API connected.',
    sudoPermission: 'sudo: revive: permission granted',
    sudoRestored: 'SYSTEM RESTORED.',
    sudoNominal: 'All processes nominal.',
    sudoDisclaimer: 'This was a harmless easter egg — nothing was executed.',
    sudoNotFound: 'command not found',
    launchingGame: 'Launching BREACH SIMULATION...',
    useArrows: 'Use ↑/↓ arrows to navigate command history.',
    bannerText: 'DOMINUS LUPORUM',
    unameSystem: 'DOMINUS SYSTEM',
    unameArch: 'Architecture: x86_64',
    unameEnv: 'Environment: WEB_TERMINAL',
    unameSec: 'Security: ACTIVE',
    sysinfoOS: 'OS: Web Environment',
    sysinfoKernel: 'Kernel: Simulated',
    sysinfoShell: 'Shell: dominus-shell',
    sysinfoStatus: 'Status: ONLINE',
    scanInit: 'Initializing security scanner...',
    scanComplete1: '[##########] 100%',
    scanNoThreats: 'No threats detected.',
    scanComplete: 'SCAN COMPLETE',
    scanDisclaimer: '> Fictional scan — no real system was checked.',
    pingSim: 'PING localhost (127.0.0.1): 56 data bytes',
    pingStats: '--- localhost ping statistics ---',
    matrixActivate: 'Matrix effect INTENSIFIED.',
    matrixDeactivate: 'Matrix effect normalized.',
    matrixDisclaimer: '> Visual effect only — no data affected.',
    themeAvailable: 'AVAILABLE THEMES',
    themeCurrent: 'Current theme:',
    themeCyberpunk: 'cyberpunk  (default)',
    unknownTheme: 'Unknown theme. Available: cyberpunk',
    historyEmpty: '  No commands in history.',
  },
  contact: {
    title: 'CONTACT',
    channels: '// CONTACT_CHANNELS',
    initialize: '> initialize_contact',
    name: 'NAME',
    email: 'EMAIL',
    message: 'MESSAGE',
    send: '[ SEND ]',
    success: 'Message transmitted successfully.',
    nameRequired: 'Name field is required.',
    emailRequired: 'Email field is required.',
    emailInvalid: 'Invalid email format.',
    messageRequired: 'Message field is required.',
    messageShort: 'Message must be at least 10 characters.',
    replaceInfo: '// Replace placeholders with your actual contact info.',
    github: 'GitHub',
    other: 'Other',
  },
  sideActivity: {
    label: '// SIDE_ACTIVITY',
    dota2: 'DOTA 2',
    hours: '~2000+ hours',
    recreational: 'RECREATIONAL',
    low: 'LOW',
  },
  game: {
    breachSim: 'BREACH SIMULATION',
    threatsWill: 'Threats will appear with a key prompt.',
    pressKey: 'Press the matching key to neutralize the threat before time runs out.',
    startSim: '▶ START SIMULATION',
    scanning: 'Scanning for threats...',
    neutralized: 'NEUTRALIZED',
    threatEscaped: 'THREAT ESCAPED',
    systemCompromised: 'SYSTEM COMPROMISED',
    finalScore: 'Final Score',
    threatsNeutralized: 'Threats neutralized',
    restart: '↻ RESTART',
    exit: 'EXIT',
    score: 'SCORE',
    lives: 'LIVES',
    status: 'STATUS',
    ready: 'READY',
    playing: 'PLAYING',
    over: 'OVER',
    closeGame: 'Close game',
    systemInit: 'System initialized.',
    defendThreats: 'Defend against incoming threats.',
  },
  controls: {
    crtMode: 'CRT MODE',
    crtOn: 'CRT: ON',
    musicOn: 'MUSIC: ON',
    musicOff: 'MUSIC: OFF',
    language: 'LANGUAGE',
    play: 'Play',
    pause: 'Pause',
    mute: 'Mute',
    unmute: 'Unmute',
    volume: 'Volume',
    prev: 'Previous',
    next: 'Next',
  },
  footer: {
    systemOnline: 'SYSTEM ONLINE',
    builtWith: 'Built with React + TypeScript + Tailwind',
  },
  threats: {
    intrusion: 'INTRUSION DETECTED — port 443',
    malware: 'MALWARE SIGNATURE — trojan.exe',
    portScan: 'PORT SCAN — 192.168.1.x',
    bruteForce: 'BRUTE FORCE — auth failure',
    dataExfil: 'DATA EXFIL — outbound spike',
    rootkit: 'ROOTKIT — kernel hook',
    phishing: 'PHISHING — spoofed domain',
    exploit: 'EXPLOIT — CVE detected',
  },
};

const fa: Translation = {
  nav: {
    home: 'خانه', about: 'درباره', skills: 'مهارت‌ها', projects: 'پروژه‌ها',
    playlist: 'پلی‌لیست', terminal: 'ترمینال', contact: 'تماس',
  },
  hero: {
    connectionEstablished: 'اتصال برقرار شد',
    subtitle: { cybersecurity: 'امنیت سایبری', malwareAnalysis: 'تحلیل بدافزار', python: 'پایتون', linux: 'لینوکس' },
    intro: 'توسعه‌دهنده و علاقه‌مند به امنیت سایبری با تمرکز بر درک سیستم‌ها، تحلیل نرم‌افزار و ساخت راه‌حل‌های امن.',
    exploreProjects: 'مشاهده پروژه‌ها',
    openTerminal: 'باز کردن ترمینال',
    systemStatus: '## وضعیت سیستم',
    online: 'آنلاین',
    os: 'لینوکس / ویندوز',
    focus: 'امنیت سایبری',
    lang: 'پایتون / C',
    status: 'آنلاین',
    scroll: '▼ پایین',
  },
  about: {
    title: 'درباره_من',
    profileData: '// داده‌های_پروفایل',
    bio: 'من توسعه‌دهنده و علاقه‌مند به امنیت سایبری هستم. به لینوکس، پایتون، برنامه‌نویسی سطح پایین، تحلیل بدافزار، مهندسی معکوس و درک نحوه کار نرم‌افزار و سیستم‌ها علاقه دارم.',
    classification: '// طبقه‌بندی',
    unclassified: 'غیرطبقه‌بندی‌شده // پروفایل باز',
    interests: '// علایق',
  },
  skills: {
    title: 'ماتریس_مهارت‌ها',
    hoverInterrogate: '// نشانگر_را_بردنید',
    hoverHint: 'نشانگر را روی هر گره مهارتی بردید تا اطلاعات دقیق را ببینید.',
    proficiencyLevels: '// سطوح_تسلط',
  },
  projects: {
    title: 'پروژه‌ها',
    database: 'پایگاه داده پروژه‌ها',
    empty: 'در حال حاضر خالی است.',
    willAppear: 'پروژه‌های واقعی پس از تکمیل در اینجا نمایش داده می‌شوند.',
    awaiting: 'در انتظار پروژه‌ها',
    status: 'وضعیت',
  },
  playlist: {
    title: 'پلی‌لیست من',
    currentlyListening: 'در حال گوش دادن',
    nowPlaying: 'در حال پخش',
    all: 'همه',
    favorites: 'محبوب‌ها',
    recent: 'اخیر',
    genre: 'ژانر',
    listen: 'گوش دادن',
    placeholder: 'محل‌نگهدار',
    track: 'قطعه',
    artist: 'هنرمند',
    album: 'آلبوم',
    noTracks: 'هیچ قطعه‌ای موجود نیست.',
    addTracksHere: 'قطعه‌های مورد علاقه خود را به فایل داده پلی‌لیست اضافه کنید.',
  },
  terminal: {
    title: 'ترمینال',
    lastLogin: 'آخرین ورود:',
    typeHelp: 'برای دیدن دستورات موجود "help" را تایپ کنید.',
    clickToFocus: '// برای تمرکز روی ترمینال کلیک کنید.',
    tryCommands: 'امتحان کنید: help, neofetch, grok, sudo revive, game',
    commandNotFound: 'دستور یافت نشد',
    helpAvailable: 'دستورات موجود',
    helpCore: 'اصلی',
    helpSystem: 'سیستم',
    helpFun: 'سرگرمی',
    helpFiles: 'فایل‌ها',
    helpHistory: 'برای پیمایش تاریخچه دستورات از ↑/↓ و برای تکمیل خودکار از TAB استفاده کنید.',
    cmdHelp: 'نمایش این پیام راهنما',
    cmdClear: 'پاک کردن صفحه ترمینال',
    cmdWhoami: 'نمایش هویت اپراتور',
    cmdPwd: 'نمایش مسیر کاری',
    cmdDate: 'نمایش تاریخ و زمان سیستم',
    cmdAbout: 'نمایش پروفایل سیستم',
    cmdSkills: 'فهرست مهارت‌های فنی',
    cmdProjects: 'فهرست پروژه‌های موجود',
    cmdContact: 'نمایش اطلاعات تماس',
    cmdUname: 'نمایش اطلاعات سیستم',
    cmdSysinfo: 'نمایش اطلاعات تفصیلی سیستم',
    cmdPing: 'شبیه‌سازی پینگ شبکه',
    cmdScan: 'اجرای اسکن امنیتی فرضی',
    cmdBanner: 'نمایش بنر ASCII',
    cmdMatrix: 'تقویت افکت ماتریکس',
    cmdTheme: 'نمایش تم‌های موجود',
    cmdGame: 'اجرای شبیه‌سازی نفوذ',
    cmdGrok: '[طبقه‌بندی‌شده] پرسش از هسته هوش مصنوعی',
    cmdLs: 'فهرست محتویات دایرکتوری',
    cmdLsGrok: '[ایستراگ] فهرست فایل‌های مخفی',
    cmdCat: 'خواندن محتویات فایل',
    cmdCatGrok: '[ایستراگ] خواندن تنظیمات مخفی',
    cmdEcho: 'نمایش متن',
    cmdNeofetch: 'خلاصه اطلاعات سیستم',
    cmdHistory: 'نمایش تاریخچه دستورات',
    whoamiLine1: 'dominus',
    whoamiLine2: 'علاقه‌مند به امنیت سایبری',
    whoamiLine3: 'توسعه‌دهنده پایتون / لینوکس',
    systemProfile: '═══ پروفایل سیستم ═══',
    interestsLabel: 'علایق:',
    techSkills: '═══ مهارت‌های فنی ═══',
    radarHint: 'برای توضیحات دقیق روی نمودار رادار نشانگر را بردنید.',
    projectDirectory: '═══ دایرکتوری پروژه‌ها ═══',
    projectEmpty: '  هنوز پروژه‌ای موجود نیست.',
    contactChannels: '═══ کانال‌های تماس ═══',
    replaceContact: 'جای‌نگهدارها را با اطلاعات تماس واقعی خود جایگزین کنید.',
    useContactForm: 'یا از فرم تماس در بخش تماس استفاده کنید.',
    catMissing: 'cat: فایل مشخص نشده است',
    catNotFound: 'چنین فایلی یا دایرکتوری وجود ندارد',
    readmeContent1: '═══ DOMINUS LUPORUM ═══',
    readmeContent2: 'ترمینال تعاملی پورتفولیو امنیت سایبری.',
    readmeContent3: 'برای دیدن دستورات "help" را تایپ کنید.',
    grokCore: '[هسته GROK آنلاین]',
    grokAnalyzing: 'در حال تحلیل سیستم...',
    grokPortfolio: 'پورتفولیو شناسایی شد.',
    grokOperator: 'وضعیت اپراتور: فعال.',
    grokSecurity: 'وضعیت امنیتی: نرمال.',
    grokDisclaimer: '> این یک پاسخ فرضی هوش مصنوعی است — هیچ API خارجی متصل نیست.',
    sudoPermission: 'sudo: revive: مجوز صادر شد',
    sudoRestored: 'سیستم بازیابی شد.',
    sudoNominal: 'تمام پردازش‌ها نرمال هستند.',
    sudoDisclaimer: 'این یک ایستراگ بی‌ضرر بود — هیچ چیزی اجرا نشد.',
    sudoNotFound: 'دستور یافت نشد',
    launchingGame: 'در حال اجرای شبیه‌سازی نفوذ...',
    useArrows: 'برای پیمایش تاریخچه از ↑/↓ استفاده کنید.',
    bannerText: 'DOMINUS LUPORUM',
    unameSystem: 'سیستم DOMINUS',
    unameArch: 'معماری: x86_64',
    unameEnv: 'محیط: ترمینال_وب',
    unameSec: 'امنیت: فعال',
    sysinfoOS: 'سیستم‌عامل: محیط وب',
    sysinfoKernel: 'هسته: شبیه‌سازی‌شده',
    sysinfoShell: 'پوسته: dominus-shell',
    sysinfoStatus: 'وضعیت: آنلاین',
    scanInit: 'در حال راه‌اندازی اسکنر امنیتی...',
    scanComplete1: '[##########] 100%',
    scanNoThreats: 'هیچ تهدیدی یافت نشد.',
    scanComplete: 'اسکن تکمیل شد',
    scanDisclaimer: '> اسکن فرضی — هیچ سیستم واقعی بررسی نشد.',
    pingSim: 'PING localhost (127.0.0.1): 56 بایت داده',
    pingStats: '--- آمار پینگ localhost ---',
    matrixActivate: 'افکت ماتریکس تقویت شد.',
    matrixDeactivate: 'افکت ماتریکس نرمال شد.',
    matrixDisclaimer: '> فقط افکت تصویری — هیچ داده‌ای تحت تأثیر قرار نگرفت.',
    themeAvailable: 'تم‌های موجود',
    themeCurrent: 'تم فعلی:',
    themeCyberpunk: 'cyberpunk  (پیش‌فرض)',
    unknownTheme: 'تم ناشناخته. موجود: cyberpunk',
    historyEmpty: '  هیچ دستوری در تاریخچه نیست.',
  },
  contact: {
    title: 'تماس',
    channels: '// کانال‌های_تماس',
    initialize: '> initialize_contact',
    name: 'نام',
    email: 'ایمیل',
    message: 'پیام',
    send: '[ ارسال ]',
    success: 'پیام با موفقیت ارسال شد.',
    nameRequired: 'فیلد نام الزامی است.',
    emailRequired: 'فیلد ایمیل الزامی است.',
    emailInvalid: 'فرمت ایمیل نامعتبر است.',
    messageRequired: 'فیلد پیام الزامی است.',
    messageShort: 'پیام باید حداقل ۱۰ کاراکتر باشد.',
    replaceInfo: '// جای‌نگهدارها را با اطلاعات تماس واقعی خود جایگزین کنید.',
    github: 'گیت‌هاب',
    other: 'سایر',
  },
  sideActivity: {
    label: '// فعالیت_جنبی',
    dota2: 'دوتا ۲',
    hours: 'حدود ۲۰۰۰+ ساعت',
    recreational: 'سرگرمی',
    low: 'کم',
  },
  game: {
    breachSim: 'شبیه‌سازی نفوذ',
    threatsWill: 'تهدیدها با یک کلید نمایش داده می‌شوند.',
    pressKey: 'کلید مطابق را قبل از اتمام زمان فشار دهید تا تهدید را خنثی کنید.',
    startSim: '▶ شروع شبیه‌سازی',
    scanning: 'در حال اسکن برای تهدیدها...',
    neutralized: 'خنثی شد',
    threatEscaped: 'تهدید فرار کرد',
    systemCompromised: 'سیستم نفوذ شده',
    finalScore: 'امتیاز نهایی',
    threatsNeutralized: 'تهدیدهای خنثی‌شده',
    restart: '↻ شروع دوباره',
    exit: 'خروج',
    score: 'امتیاز',
    lives: 'جان',
    status: 'وضعیت',
    ready: 'آماده',
    playing: 'در حال بازی',
    over: 'پایان',
    closeGame: 'بستن بازی',
    systemInit: 'سیستم راه‌اندازی شد.',
    defendThreats: 'در برابر تهدیدهای ورودی دفاع کنید.',
  },
  controls: {
    crtMode: 'حالت CRT',
    crtOn: 'CRT: روشن',
    musicOn: 'موسیقی: روشن',
    musicOff: 'موسیقی: خاموش',
    language: 'زبان',
    play: 'پخش',
    pause: 'توقف',
    mute: 'بی‌صدا',
    unmute: 'با صدا',
    volume: 'صدا',
    prev: 'قبلی',
    next: 'بعدی',
  },
  footer: {
    systemOnline: 'سیستم آنلاین',
    builtWith: 'ساخته‌شده با React + TypeScript + Tailwind',
  },
  threats: {
    intrusion: 'نفوذ شناسایی شد — پورت ۴۴۳',
    malware: 'امضای بدافزار — trojan.exe',
    portScan: 'اسکن پورت — 192.168.1.x',
    bruteForce: 'حمله بروت‌فورس — خطای احراز هویت',
    dataExfil: 'نشت داده — افزایش خروجی',
    rootkit: 'روت‌کیت — هوک کرنل',
    phishing: 'فیشینگ — دامنه جعلی',
    exploit: 'اکسپلویت — CVE شناسایی شد',
  },
};

const ru: Translation = {
  nav: {
    home: 'ГЛАВНАЯ', about: 'ОБО МНЕ', skills: 'НАВЫКИ', projects: 'ПРОЕКТЫ',
    playlist: 'ПЛЕЙЛИСТ', terminal: 'ТЕРМИНАЛ', contact: 'КОНТАКТЫ',
  },
  hero: {
    connectionEstablished: 'СОЕДИНЕНИЕ УСТАНОВЛЕНО',
    subtitle: { cybersecurity: 'Кибербезопасность', malwareAnalysis: 'Анализ вредоносного ПО', python: 'Python', linux: 'Linux' },
    intro: 'Разработчик и энтузиаст кибербезопасности, сосредоточенный на понимании систем, анализе программного обеспечения и создании безопасных решений.',
    exploreProjects: 'Смотреть проекты',
    openTerminal: 'Открыть терминал',
    systemStatus: '## СТАТУС СИСТЕМЫ',
    online: 'ОНЛАЙН',
    os: 'Linux / Windows',
    focus: 'Кибербезопасность',
    lang: 'Python / C',
    status: 'ОНЛАЙН',
    scroll: '▼ вниз',
  },
  about: {
    title: 'ОБО_МНЕ',
    profileData: '// ДАННЫЕ_ПРОФИЛЯ',
    bio: 'Я разработчик и энтузиаст кибербезопасности. Увлекаюсь Linux, Python, низкоуровневым программированием, анализом вредоносного ПО, реверс-инжинирингом и пониманием того, как работают программы и системы.',
    classification: '// КЛАССИФИКАЦИЯ',
    unclassified: 'НЕКЛАССИФИЦИРОВАНО // ОТКРЫТЫЙ ПРОФИЛЬ',
    interests: '// ИНТЕРЕСЫ',
  },
  skills: {
    title: 'МАТРИЦА_НАВЫКОВ',
    hoverInterrogate: '// НАВЕДИТЕ_КУРСОР',
    hoverHint: 'Наведите курсор на любой узел навыка, чтобы увидеть подробную информацию.',
    proficiencyLevels: '// УРОВНИ_ВЛАДЕНИЯ',
  },
  projects: {
    title: 'ПРОЕКТЫ',
    database: 'БАЗА ДАННЫХ ПРОЕКТОВ',
    empty: 'В настоящее время пусто.',
    willAppear: 'Реальные проекты появятся здесь по мере их завершения.',
    awaiting: 'ОЖИДАНИЕ ПРОЕКТОВ',
    status: 'СТАТУС',
  },
  playlist: {
    title: 'МОЙ ПЛЕЙЛИСТ',
    currentlyListening: 'Сейчас слушаю',
    nowPlaying: 'СЕЙЧАС ИГРАЕТ',
    all: 'ВСЕ',
    favorites: 'ИЗБРАННЫЕ',
    recent: 'НЕДАВНИЕ',
    genre: 'ЖАНР',
    listen: 'СЛУШАТЬ',
    placeholder: 'ЗАГЛУШКА',
    track: 'Трек',
    artist: 'Исполнитель',
    album: 'Альбом',
    noTracks: 'Нет доступных треков.',
    addTracksHere: 'Добавьте любимые треки в файл данных плейлиста.',
  },
  terminal: {
    title: 'ТЕРМИНАЛ',
    lastLogin: 'Последний вход:',
    typeHelp: 'Введите "help" для списка доступных команд.',
    clickToFocus: '// Кликните по терминалу для фокуса.',
    tryCommands: 'Попробуйте: help, neofetch, grok, sudo revive, game',
    commandNotFound: 'команда не найдена',
    helpAvailable: 'ДОСТУПНЫЕ КОМАНДЫ',
    helpCore: 'ОСНОВНЫЕ',
    helpSystem: 'СИСТЕМА',
    helpFun: 'РАЗВЛЕЧЕНИЯ',
    helpFiles: 'ФАЙЛЫ',
    helpHistory: 'Используйте ↑/↓ для навигации по истории. TAB для автодополнения.',
    cmdHelp: 'Показать это сообщение справки',
    cmdClear: 'Очистить экран терминала',
    cmdWhoami: 'Показать личность оператора',
    cmdPwd: 'Показать рабочий каталог',
    cmdDate: 'Показать текущую дату/время',
    cmdAbout: 'Показать профиль системы',
    cmdSkills: 'Список технических навыков',
    cmdProjects: 'Список доступных проектов',
    cmdContact: 'Показать контактную информацию',
    cmdUname: 'Показать информацию о системе',
    cmdSysinfo: 'Подробная информация о системе',
    cmdPing: 'Симулировать сетевой ping',
    cmdScan: 'Запустить фиктивное сканирование безопасности',
    cmdBanner: 'Показать ASCII баннер',
    cmdMatrix: 'Усилить эффект Матрицы',
    cmdTheme: 'Показать доступные темы',
    cmdGame: 'Запустить SIMULATION BREACH',
    cmdGrok: '[КЛАССИФИЦИРОВАНО] Запрос к ядру ИИ',
    cmdLs: 'Список содержимого каталога',
    cmdLsGrok: '[ПАСХАЛКА] Список скрытых файлов',
    cmdCat: 'Прочитать содержимое файла',
    cmdCatGrok: '[ПАСХАЛКА] Читать скрытый конфиг',
    cmdEcho: 'Отобразить текст',
    cmdNeofetch: 'Сводка информации о системе',
    cmdHistory: 'Показать историю команд',
    whoamiLine1: 'dominus',
    whoamiLine2: 'Энтузиаст кибербезопасности',
    whoamiLine3: 'Разработчик Python / Linux',
    systemProfile: '═══ ПРОФИЛЬ СИСТЕМЫ ═══',
    interestsLabel: 'ИНТЕРЕСЫ:',
    techSkills: '═══ ТЕХНИЧЕСКИЕ НАВЫКИ ═══',
    radarHint: 'Наведите курсор на радар для подробных описаний.',
    projectDirectory: '═══ КАТАЛОГ ПРОЕКТОВ ═══',
    projectEmpty: '  Проектов пока нет.',
    contactChannels: '═══ КОНТАКТНЫЕ КАНАЛЫ ═══',
    replaceContact: 'Замените заглушки на ваши реальные контакты.',
    useContactForm: 'Или используйте форму в разделе КОНТАКТЫ.',
    catMissing: 'cat: отсутствует операнд файла',
    catNotFound: 'Нет такого файла или каталога',
    readmeContent1: '═══ DOMINUS LUPORUM ═══',
    readmeContent2: 'Интерактивный терминал портфолио кибербезопасности.',
    readmeContent3: 'Введите "help" для списка команд.',
    grokCore: '[ЯДРО GROK ОНЛАЙН]',
    grokAnalyzing: 'Анализ системы...',
    grokPortfolio: 'Портфолио обнаружено.',
    grokOperator: 'Статус оператора: АКТИВЕН.',
    grokSecurity: 'Уровень безопасности: НОРМАЛЬНЫЙ.',
    grokDisclaimer: '> Это вымышленный ответ ИИ — нет подключения к внешним API.',
    sudoPermission: 'sudo: revive: разрешение предоставлено',
    sudoRestored: 'СИСТЕМА ВОССТАНОВЛЕНА.',
    sudoNominal: 'Все процессы в норме.',
    sudoDisclaimer: 'Это безобидная пасхалка — ничего не было выполнено.',
    sudoNotFound: 'команда не найдена',
    launchingGame: 'Запуск SIMULATION BREACH...',
    useArrows: 'Используйте ↑/↓ для навигации по истории команд.',
    bannerText: 'DOMINUS LUPORUM',
    unameSystem: 'СИСТЕМА DOMINUS',
    unameArch: 'Архитектура: x86_64',
    unameEnv: 'Среда: WEB_TERMINAL',
    unameSec: 'Безопасность: АКТИВНА',
    sysinfoOS: 'ОС: Веб-среда',
    sysinfoKernel: 'Ядро: Симулированное',
    sysinfoShell: 'Оболочка: dominus-shell',
    sysinfoStatus: 'Статус: ОНЛАЙН',
    scanInit: 'Инициализация сканера безопасности...',
    scanComplete1: '[##########] 100%',
    scanNoThreats: 'Угроз не обнаружено.',
    scanComplete: 'СКАНИРОВАНИЕ ЗАВЕРШЕНО',
    scanDisclaimer: '> Фиктивное сканирование — реальная система не проверялась.',
    pingSim: 'PING localhost (127.0.0.1): 56 байт данных',
    pingStats: '--- статистика ping localhost ---',
    matrixActivate: 'Эффект Матрицы УСИЛЕН.',
    matrixDeactivate: 'Эффект Матрицы нормализован.',
    matrixDisclaimer: '> Только визуальный эффект — данные не затронуты.',
    themeAvailable: 'ДОСТУПНЫЕ ТЕМЫ',
    themeCurrent: 'Текущая тема:',
    themeCyberpunk: 'cyberpunk  (по умолчанию)',
    unknownTheme: 'Неизвестная тема. Доступно: cyberpunk',
    historyEmpty: '  История команд пуста.',
  },
  contact: {
    title: 'КОНТАКТЫ',
    channels: '// КОНТАКТНЫЕ_КАНАЛЫ',
    initialize: '> initialize_contact',
    name: 'ИМЯ',
    email: 'EMAIL',
    message: 'СООБЩЕНИЕ',
    send: '[ ОТПРАВИТЬ ]',
    success: 'Сообщение успешно отправлено.',
    nameRequired: 'Поле имени обязательно.',
    emailRequired: 'Поле email обязательно.',
    emailInvalid: 'Неверный формат email.',
    messageRequired: 'Поле сообщения обязательно.',
    messageShort: 'Сообщение должно содержать не менее 10 символов.',
    replaceInfo: '// Замените заглушки на ваши реальные контакты.',
    github: 'GitHub',
    other: 'Другое',
  },
  sideActivity: {
    label: '// ДОПОЛНИТЕЛЬНО',
    dota2: 'DOTA 2',
    hours: '~2000+ часов',
    recreational: 'РАЗВЛЕЧЕНИЕ',
    low: 'НИЗКИЙ',
  },
  game: {
    breachSim: 'SIMULATION BREACH',
    threatsWill: 'Угрозы появятся с подсказкой клавиши.',
    pressKey: 'Нажмите соответствующую клавишу, чтобы нейтрализовать угрозу до истечения времени.',
    startSim: '▶ НАЧАТЬ СИМУЛЯЦИЮ',
    scanning: 'Сканирование угроз...',
    neutralized: 'НЕЙТРАЛИЗОВАНО',
    threatEscaped: 'УГРОЗА УСКОЛЬЗНУЛА',
    systemCompromised: 'СИСТЕМА СКОМПРОМЕТИРОВАНА',
    finalScore: 'Итоговый счёт',
    threatsNeutralized: 'Нейтрализовано угроз',
    restart: '↻ ЗАНОВО',
    exit: 'ВЫХОД',
    score: 'СЧЁТ',
    lives: 'ЖИЗНИ',
    status: 'СТАТУС',
    ready: 'ГОТОВ',
    playing: 'ИГРА',
    over: 'КОНЕЦ',
    closeGame: 'Закрыть игру',
    systemInit: 'Система инициализирована.',
    defendThreats: 'Защищайтесь от входящих угроз.',
  },
  controls: {
    crtMode: 'РЕЖИМ CRT',
    crtOn: 'CRT: ВКЛ',
    musicOn: 'МУЗЫКА: ВКЛ',
    musicOff: 'МУЗЫКА: ВЫКЛ',
    language: 'ЯЗЫК',
    play: 'Играть',
    pause: 'Пауза',
    mute: 'Без звука',
    unmute: 'Со звуком',
    volume: 'Громкость',
    prev: 'Предыдущий',
    next: 'Следующий',
  },
  footer: {
    systemOnline: 'СИСТЕМА ОНЛАЙН',
    builtWith: 'Создано на React + TypeScript + Tailwind',
  },
  threats: {
    intrusion: 'ОБНАРУЖЕН ВТОРЖЕНИЕ — порт 443',
    malware: 'СИГНАТУРА ВРЕДОНОСА — trojan.exe',
    portScan: 'СКАН ПОРТОВ — 192.168.1.x',
    bruteForce: 'БРУТФОРС — ошибка аутентификации',
    dataExfil: 'ЭКСФИЛЬТРАЦИЯ — исходящий пик',
    rootkit: 'РУТКИТ — перехват ядра',
    phishing: 'ФИШИНГ — подделанный домен',
    exploit: 'ЭКСПЛОЙТ — CVE обнаружен',
  },
};

export const translations: Record<Language, Translation> = { en, fa, ru };

export const languageLabels: Record<Language, string> = {
  en: 'EN',
  fa: 'FA',
  ru: 'RU',
};

export const isRTL = (lang: Language): boolean => lang === 'fa';
