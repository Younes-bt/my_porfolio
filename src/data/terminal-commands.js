export const terminalCommands = {
  help: {
    description: 'List available commands',
    output: [
      'Available commands:',
      '- full_name',
      '- about',
      '- skills',
      '- stacks',
      '- projects',
      '- experience',
      '- contact',
      '- clear',
    ],
  },
  '?': {
    description: 'Alias for help',
    output: ['Type help to see available commands.'],
  },
  full_name: {
    description: 'Display full name',
    output: ['Younes El Bettate'],
  },
  about: {
    description: 'Show short bio',
    output: ['Self-taught full-stack developer and founder of OPICOM Tech, building purposeful digital products.'],
  },
  skills: {
    description: 'List key skills',
    output: ['API Design · UI Engineering · Product Strategy · Motion Design · Rapid Prototyping'],
  },
  stacks: {
    description: 'List core stacks',
    output: [
      'Backend: Python, Django, FastAPI, Postgres, Redis, Docker',
      'Frontend: React, Vite, Tailwind, Framer Motion, i18n',
      'Mobile/Desktop: React Native, Tauri',
    ],
  },
  projects: {
    description: 'Show highlight projects',
    output: ['Ksar-Data · Civic dashboards · OPICOM Studio · Restaurant OS'],
  },
  experience: {
    description: 'Show summary of experience',
    output: ['4+ years building end-to-end solutions for schools, civic tech, and independent clients.'],
  },
  contact: {
    description: 'How to reach out',
    output: ['Email: hello@opicom.tech · Twitter: @younes.codes · GitHub: @opicomtech'],
  },
};
