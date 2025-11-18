// --- START OF FILE terminal-commands.js ---

export const terminalCommands = {
  // --- ESSENTIALS ---
  help: {
    description: 'List available commands',
    output: [
      'Available commands:',
      '  about       - Who is Younes?',
      '  stacks      - Tech arsenal',
      '  projects    - Case studies',
      '  experience  - Career timeline',
      '  contact     - Communication channels',
      '  setup       - Hardware & Software config',
      '  ls          - List directory contents',
      '  clear       - Clear the terminal',
    ],
  },
  '?': {
    description: 'Alias for help',
    output: ['Type "help" to see available commands.'],
  },
  clear: {
    description: 'Clears the terminal',
    output: [], // Logic handled in component, but good to have key here
  },

  // --- BIO & INFO ---
  about: {
    description: 'Show short bio',
    output: [
      '>> IDENTITY_VERIFIED',
      'Younes El Bettate',
      '-----------------',
      'Self-taught Full-Stack Developer & Founder of OPICOM Tech.',
      'Based in Morocco 🇲🇦',
      'Focus: Building purposeful digital products, civic tech tools, and school management systems.',
    ],
  },
  full_name: {
    description: 'Display full name',
    output: ['Younes El Bettate'],
  },
  skills: {
    description: 'List key skills',
    output: [
      '>> LOADING_SKILL_MATRIX...',
      '- Architecture: API Design, Microservices, MVC',
      '- UI/UX: Motion Design, Rapid Prototyping, Design Systems',
      '- Strategy: Product Management, Agile/Scrum',
    ],
  },
  stacks: {
    description: 'List core stacks',
    output: [
      '>> ANALYZING_CODEBASE...',
      '[BACKEND]   Python (Django, FastAPI), PostgreSQL, Redis, Docker',
      '[FRONTEND]  React, TypeScript, TailwindCSS, Framer Motion',
      '[MOBILE]    React Native, Expo',
      '[DESKTOP]   Tauri, Electron',
    ],
  },
  projects: {
    description: 'Show highlight projects',
    output: [
      '1. Ksar-Data ....... [Civic Tech Dashboard]',
      '2. OPICOM Studio ... [Agency Portfolio]',
      '3. Restaurant OS ... [POS System]',
      '4. School MS ....... [EdTech Platform]',
      '',
      'Type "open <project_name>" (coming soon) to view details.',
    ],
  },
  experience: {
    description: 'Show summary of experience',
    output: [
      '>> TIMELINE_FETCHED',
      '[202X - Now] Founder @ OPICOM Tech',
      '[202X - 202X] Freelance Full-Stack Developer',
      '-----------------',
      '4+ years building end-to-end solutions for schools, civic tech, and independent clients.',
    ],
  },
  contact: {
    description: 'How to reach out',
    output: [
      '>> OPENING_CHANNELS...',
      'Email:    bt.younesse@gmail.com',
      'GitHub:   github.com/Younes-bt',
      'LinkedIn: /in/unesbt42',
    ],
  },

  // --- SIMULATION & UTILITY ---
  ls: {
    description: 'List files',
    output: [
      'drwxr-xr-x  younes  projects/',
      'drwxr-xr-x  younes  skills/',
      'drwxr-xr-x  younes  config/',
      '-rw-r--r--  younes  resume.pdf',
      '-rw-r--r--  younes  secret_plans.txt',
    ],
  },
  pwd: {
    description: 'Print working directory',
    output: ['/home/guest/portfolio'],
  },
  whoami: {
    description: 'Current user',
    output: ['guest@younes.dev (Access Level: VISITOR)'],
  },
  date: {
    description: 'Show date',
    output: [new Date().toString()],
  },

  // --- DEV ENVIRONMENT ---
  setup: {
    description: 'Development environment',
    output: [
      '>> FETCHING_SYSTEM_SPECS',
      '- Editor:   VS Code (Theme: One Dark Pro)',
      '- Font:     Geist Mono / JetBrains Mono',
      '- Terminal: Zsh + Oh My Zsh + Starship',
      '- Browser:  Arc / Chrome Developer Edition',
    ],
  },

  // --- EASTER EGGS ---
  sudo: {
    description: 'Superuser do',
    output: [
      'I like the way how you Think!!. This incident will be reported.',
      '(Nice try, though.)',
    ],
  },
  cat: {
    description: 'Read file',
    output: ['usage: cat <filename> (File system access is restricted for guests)'],
  },
  coffee: {
    description: 'Brew coffee',
    output: [
      '☕ Brewing...',
      'Error 418: I am a teapot.',
    ],
  },
  exit: {
    description: 'Close terminal',
    output: ['There is no escape. You must hire me first.'],
  },
};