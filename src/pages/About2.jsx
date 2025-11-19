import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Code2, LayoutPanelTop, PenTool, Terminal, Wifi, Smartphone, Monitor, 
  Layers, Palette, Move, Cpu, Zap, Box, Grid, Maximize, Scan, Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { terminalCommands } from '@/data/terminal-commands';

// --- 1. CONFIGURATION & DATA ---

const tabConfig = [
  { value: 'backend', icon: Code2, label: 'System Core' },
  { value: 'frontend', icon: LayoutPanelTop, label: 'UI Architecture' },
  { value: 'designer', icon: PenTool, label: 'Visual Labs' },
];

const sketchPlaceholders = {
  hero: {
    desktopSketch: '/sketches/hero-desktop-sketch.jpg',
    desktopFinal: '/sketches/hero-desktop.jpg',
    mobileSketch: '/sketches/hero-mobile-sketch.jpg',
    mobileFinal: '/sketches/hero-mobile.jpg',
  },
  about: {
    desktopSketch: '/sketches/about-desktop-sketch.jpg',
    desktopFinal: '/sketches/about-desktop.jpg',
    mobileSketch: '/sketches/about-mobile-sketch.jpg',
    mobileFinal: '/sketches/about-mobile.jpg',
  },
};

/* --- LOGO LAYERS DATA (Split by Z-Depth) --- */
// I grouped your paths. 
// Bottom layer = The base legs. 
// Middle layer = The middle chevron. 
// Top layer = The top diamond/chevron.
const logoLayers = [
  { 
    id: 'base',
    z: 20, // Depth
    paths: [
      "M367.08,584.05l-130.93-75.59c-5.06-2.92-8.18-8.32-8.18-14.17V361.96c0-5.85-3.12-11.25-8.18-14.17 L154.31,310c-10.91-6.3-24.54,1.58-24.54,14.17v226.79c0,5.85,3.12,11.25,8.18,14.17l245.49,141.72c5.06,2.92,8.18,8.32,8.18,14.17 v0.01c0,12.59-13.63,20.47-24.54,14.17L154.31,612.42c-10.91-6.29-24.54,1.58-24.54,14.17v75.52c0,5.84,3.12,11.25,8.18,14.17 l327.32,189.01c10.91,6.3,24.54-1.57,24.54-14.17V513.19c0-5.84-3.12-11.24-8.17-14.17l-65.47-37.84 c-10.91-6.3-24.55,1.57-24.55,14.17v94.52C391.62,582.47,377.98,590.34,367.08,584.05z",
      "M522.54,513.19v377.93c0,12.6,13.64,20.47,24.54,14.17l327.32-189.01c5.06-2.92,8.18-8.32,8.18-14.17V324.18 c0-12.6-13.64-20.47-24.54-14.17L530.72,499.03C525.66,501.95,522.54,507.35,522.54,513.19z M784.39,645.44v0.02 c0,5.85-3.12,11.25-8.18,14.17L645.28,735.2c-10.91,6.3-24.54-1.58-24.54-14.17v-0.01c0-5.85,3.12-11.25,8.18-14.17l130.93-75.59 C770.76,624.97,784.39,632.84,784.39,645.44z M784.39,494.28L784.39,494.28c0,5.85-3.12,11.25-8.18,14.17l-130.93,75.59 c-10.91,6.3-24.54-1.57-24.54-14.17v-0.02c0-5.85,3.12-11.25,8.18-14.17l130.93-75.57C770.76,473.82,784.39,481.69,784.39,494.28z"
    ]
  },
  {
    id: 'mid',
    z: 50,
    paths: [
      "M759.85,215.58L514.36,357.27c-5.06,2.92-11.3,2.92-16.36,0L252.51,215.58c-5.06-2.92-11.3-2.92-16.36,0 l-65.44,37.77c-10.91,6.3-10.91,22.04,0,28.34l327.29,189c5.06,2.92,11.3,2.92,16.36,0l327.29-189c10.91-6.3,10.91-22.04,0-28.34 l-65.44-37.77C771.14,212.66,764.91,212.66,759.85,215.58z"
    ]
  },
  {
    id: 'top',
    z: 80,
    paths: [
      "M579.85,102.21l-65.49-37.85c-5.07-2.93-11.31-2.93-16.38,0l-65.49,37.85c-10.9,6.3-10.9,22.05,0.01,28.34 L498,168.32c5.06,2.92,11.29,2.92,16.35,0l65.49-37.78C590.75,124.25,590.76,108.51,579.85,102.21z",
      "M710.75,177.71l-65.47-37.76c-5.06-2.92-11.3-2.92-16.36,0l-114.56,66.16c-5.06,2.92-11.3,2.92-16.36,0 l-114.56-66.16c-5.06-2.92-11.3-2.92-16.36,0l-65.47,37.76c-10.91,6.29-10.92,22.04-0.01,28.34L498,319.45 c5.06,2.92,11.3,2.92,16.36,0l196.4-113.39C721.66,199.75,721.66,184,710.75,177.71z"
    ]
  }
];

// --- 2. MAIN COMPONENT ---

export default function AboutPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState('backend');
  const tabs = t('about.tabs', { returnObjects: true }) || {};
  const aboutPage2Strings = t('aboutPage2', { returnObjects: true }) || {};
  const backendStrings = aboutPage2Strings.backend || {};
  const frontendStrings = aboutPage2Strings.frontend || {};
  const designerStrings = aboutPage2Strings.designer || {};
  const localizedCommands = t('terminalData.commands', { returnObjects: true });
  const commandDictionary =
    localizedCommands && typeof localizedCommands === 'object' && Object.keys(localizedCommands).length > 0
      ? localizedCommands
      : terminalCommands;

  return (
    <div className="min-h-screen w-full space-y-8 px-4 py-8 md:py-12">
      {/* HEADER */}
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('about.title') || "Technical Profile"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t('about.subtitle') || "Select a module to inspect capabilities."}
          </p>
        </div>

        {/* Floating Tab Bar */}
        <div className="flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/50 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50">
            {tabConfig.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setActive(value)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active === value 
                    ? "text-emerald-600 dark:text-emerald-300" 
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {active === value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tabs[value] || label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {active === 'backend' && <BackendWindow strings={backendStrings} commands={commandDictionary} />}
            {active === 'frontend' && <FrontendWindow strings={frontendStrings} />}
            {active === 'designer' && <DesignerWindow strings={designerStrings} />}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           1. BACKEND (TERMINAL)                            */
/* -------------------------------------------------------------------------- */

function BackendWindow({ strings, commands }) {
  const sidebar = strings?.sidebar || {};
  const terminalStrings = strings?.terminal || {};
  const processList =
    Array.isArray(sidebar.processes) && sidebar.processes.length > 0
      ? sidebar.processes
      : [
          { name: 'node_server', pid: 'PID: 402', active: true },
          { name: 'docker_daemon', pid: 'PID: 119', active: false },
          { name: 'postgres_worker', pid: 'PID: 882', active: false },
        ];
  const commandDictionary =
    commands && typeof commands === 'object' && Object.keys(commands).length > 0 ? commands : terminalCommands;
  return (
    <div className="grid h-[600px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0c0c0c] shadow-2xl md:h-[65vh] md:grid-cols-[240px_1fr]">
      {/* Sidebar Stats (Decorative - Hidden on Mobile) */}
      <div className="hidden h-full flex-col border-r border-white/10 bg-white/5 p-5 md:flex">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal size={18} />
            <span className="font-mono text-xs font-bold tracking-widest">
              {sidebar.systemLabel || 'SYSTEM_ROOT'}
            </span>
          </div>
          
          {/* Stats */}
          <div className="space-y-6 font-mono text-[10px] text-slate-400">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Cpu size={12}/> {sidebar.cpuLabel || 'CPU'}</span>
                <span className="text-emerald-500">{sidebar.cpuValue || '12%'}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div 
                  animate={{ width: ["10%", "30%", "12%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-emerald-500" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Zap size={12}/> {sidebar.ramLabel || 'RAM'}</span>
                <span className="text-amber-500">{sidebar.ramValue || '424MB'}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[40%] bg-amber-500" />
              </div>
            </div>

            <div className="pt-4">
               <p className="mb-3 text-xs font-bold text-slate-300">
                 {sidebar.processesLabel || 'PROCESSES:'}
               </p>
               <ul className="space-y-3">
                 {processList.map((proc) => (
                   <li
                     key={`${proc.name}-${proc.pid}`}
                     className={cn(
                       'flex items-center gap-2',
                       proc.active ? 'text-emerald-300/80' : 'text-slate-500'
                     )}
                   >
                     <div
                       className={cn(
                         'h-1.5 w-1.5 rounded-full',
                         proc.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'
                       )}
                     />
                     {proc.name} <span className="ml-auto opacity-50">{proc.pid}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-auto font-mono text-[10px] text-slate-600">
          {sidebar.uptime || 'Uptime: 14d 2h 12m'}
        </div>
      </div>

      {/* Terminal Area - Fixed Height & Scrolling */}
      <div className="relative flex h-full flex-col overflow-hidden bg-[#0A0A0A]">
        {/* Terminal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Wifi size={10} />
            {terminalStrings?.status || 'SSH: connected'}
          </div>
        </div>

        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

        {/* Interactive Content */}
        <InteractiveTerminal commands={commandDictionary} terminalStrings={terminalStrings} />
      </div>
    </div>
  );
}

function InteractiveTerminal({ commands, terminalStrings }) {
  const initialEntries = [
    { type: 'banner', text: terminalStrings?.banner || "Younes Interactive Shell v2.0.4" },
    { type: 'text', text: terminalStrings?.connectedMessage || 'Connected to remote instance.' },
    { type: 'text', text: terminalStrings?.helpHint || 'Type "help" to view available commands.' },
  ];
  const [entries, setEntries] = useState(initialEntries);
  const [command, setCommand] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const runCommand = (raw) => {
    const value = raw.trim();
    if (!value) return;
    const normalized = value.toLowerCase();

    if (normalized === 'clear') {
      setEntries([{ type: 'text', text: terminalStrings?.clearMessage || 'Console cleared.' }]);
      return;
    }

    const prompt = terminalStrings?.prompt || 'guest@portfolio:~$';
    const commandEntry = { type: 'command', text: `${prompt} ${value}` };
    
    // Logic to look up commands
    const lookup = commands && typeof commands === 'object' ? commands[normalized] : null;

    let responseEntries;
    if (lookup) {
        responseEntries = lookup.output.map((line) => ({ type: 'text', text: line }));
    } else {
        const template = terminalStrings?.error || `Command not found: ${value}. Try "help".`;
        responseEntries = [{
          type: 'error',
          text: template.replace('{{command}}', value),
        }];
    }

    setEntries((prev) => [...prev, commandEntry, ...responseEntries]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runCommand(command);
    setCommand('');
  };

  return (
    <div 
      className="relative z-0 flex h-full flex-col overflow-hidden p-4 font-mono text-sm md:text-base" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scrollable Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 pb-2"
      >
        {entries.map((entry, index) => (
          <div key={index} className="mb-1">
             <p className={cn(
              'break-words',
              entry.type === 'banner' && 'text-emerald-400 font-bold mb-4 text-lg',
              entry.type === 'command' && 'text-slate-400 mt-4',
              entry.type === 'error' && 'text-rose-400',
              entry.type === 'text' && 'text-slate-200 leading-relaxed whitespace-pre-wrap'
            )}>
              {entry.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input Area (Fixed) */}
      <form onSubmit={handleSubmit} className="mt-2 flex shrink-0 items-center border-t border-white/5 pt-2">
        <span className="mr-2 text-emerald-500">{terminalStrings?.prompt || 'guest@portfolio:~$'}</span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
          autoComplete="off"
          spellCheck="false"
        />
        <div className="h-4 w-2 animate-pulse bg-emerald-500" />
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           2. FRONTEND (SLIDER)                             */
/* -------------------------------------------------------------------------- */

function FrontendWindow({ strings }) {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const title = strings?.title || 'UI Compilation Process';
  const subtitle = strings?.subtitle || 'Drag slider to compare Wireframe vs. Production.';
  const deviceLabels = strings?.devices || {};
  const sliderLabels = strings?.labels || {};
  
  // Use provided sketches or fallback to placeholders for demo
  const heroExample = sketchPlaceholders.hero || {
    desktopSketch: "/sketches/hero-desktop-sketch.jpg",
    desktopFinal: "/sketches/hero-desktop.jpg",
    mobileSketch: "/sketches/hero-mobile-sketch.jpg",
    mobileFinal: "/sketches/hero-mobile.jpg"
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-4 shadow-xl backdrop-blur-sm dark:border-white/5 dark:bg-slate-900/50 sm:p-6">
      
      {/* Controls Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex self-start rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-950 sm:self-center">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeDevice === 'desktop'
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <Monitor size={14} /> {deviceLabels.desktop || 'Desktop'}
          </button>
          <button
            onClick={() => setActiveDevice('mobile')}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeDevice === 'mobile'
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <Smartphone size={14} /> {deviceLabels.mobile || 'Mobile'}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center rounded-2xl border border-slate-200 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-white p-4 shadow-inner dark:border-white/10 dark:bg-[#050505] sm:p-8">
        <CompareSlider 
          device={activeDevice}
          beforeSrc={activeDevice === 'desktop' ? heroExample.desktopSketch : heroExample.mobileSketch}
          afterSrc={activeDevice === 'desktop' ? heroExample.desktopFinal : heroExample.mobileFinal}
          labels={sliderLabels}
        />
      </div>
    </div>
  );
}

function CompareSlider({ device, beforeSrc, afterSrc, labels }) {
  const [percent, setPercent] = useState(50);
  const sliderRef = useRef(null);
  const isDesktop = device === 'desktop';
  const renderedLabel = labels?.rendered || 'Rendered';
  const blueprintLabel = labels?.blueprint || 'Blueprint';

  const updatePercent = (clientX) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relative = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPercent((relative / rect.width) * 100);
  };

  const handleInteraction = (e) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updatePercent(clientX);
  };

  return (
    <motion.div 
      layout
      className={cn(
        "relative select-none overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800",
        isDesktop 
          ? "aspect-video w-full max-w-3xl rounded-lg" 
          : "aspect-[9/19.5] w-full max-w-[320px] rounded-[2.5rem] border-4 border-slate-800 dark:border-slate-700"
      )}
      ref={sliderRef}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* AFTER IMAGE (Background - Production) */}
      <img src={afterSrc} alt="Final" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
      
      {/* LABEL (Production) */}
      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur">
        {renderedLabel}
      </div>

      {/* BEFORE IMAGE (Clipped - Sketch) */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img src={beforeSrc} alt="Sketch" className="absolute inset-0 h-full w-full object-cover grayscale filter" draggable="false" />
        <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" /> {/* Blueprint tint */}
        
        {/* LABEL (Sketch) */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur">
          {blueprintLabel}
        </div>
      </div>

      {/* SLIDER HANDLE */}
      <div 
        className="absolute inset-y-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${percent}%` }}
      >
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow-lg transition-transform hover:scale-110">
          <Move size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}
/* -------------------------------------------------------------------------- */
/*                   5. DESIGNER WINDOW (THE HOLOGRAPHIC LAB)                 */
/* -------------------------------------------------------------------------- */

function DesignerWindow({ strings }) {
  const [spread, setSpread] = useState(0); 
  const [wireframe, setWireframe] = useState(false);
  const [glow, setGlow] = useState(true);
  const labels = {
    visualEngine: strings?.visualEngineLabel || 'Visual Engine',
    logoLabTitle: strings?.logoLabTitle || 'Logo Lab',
    logoLabDescription: strings?.logoLabDescription || 'Interact with the brand identity in 3D space.',
    explosionFactor: strings?.explosionFactor || 'Explosion Factor',
    neonBloom: strings?.neonBloom || 'Neon Bloom',
    renderModes: strings?.renderModes || 'Render Modes',
    interactivePreview: strings?.interactivePreview || 'Interactive Preview',
  };
  
  return (

    // This lets it scroll on mobile but stays fixed on desktop.
    <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl dark:border-slate-700 dark:bg-[#050505] lg:h-[600px] lg:flex-row">
      
      {/* --- LEFT: CONTROL PANEL --- */}
      <div className="z-20 flex w-full flex-col border-b border-slate-200 bg-white/80 backdrop-blur p-6 dark:border-slate-800 dark:bg-[#0A0A0A]/90 lg:w-80 lg:border-b-0 lg:border-r">
        
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500">
            <Scan size={14} /> {labels.visualEngine}
          </div>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{labels.logoLabTitle}</h3>
          <p className="text-xs text-slate-500 mt-1">{labels.logoLabDescription}</p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          
          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-2"><Layers size={12} /> {labels.explosionFactor}</span>
              <span className="font-mono text-emerald-500">{spread}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={spread} 
              onChange={(e) => setSpread(parseInt(e.target.value))}
              className="h-1.5 w-full appearance-none rounded-full bg-slate-200 outline-none dark:bg-slate-800 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3">
             <label className="text-xs font-medium uppercase text-slate-400 tracking-wider">
               {labels.renderModes}
             </label>
             
             <button 
                onClick={() => setWireframe(!wireframe)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
             >
               <span className="flex items-center gap-2 text-sm font-medium dark:text-slate-200">
                 <Grid size={14} /> Wireframe
               </span>
               <div className={cn("h-4 w-8 rounded-full p-0.5 transition-colors", wireframe ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700")}>
                 <motion.div animate={{ x: wireframe ? 16 : 0 }} className="h-3 w-3 rounded-full bg-white shadow-sm" />
               </div>
             </button>

             <button 
                onClick={() => setGlow(!glow)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
             >
               <span className="flex items-center gap-2 text-sm font-medium dark:text-slate-200">
                 <Zap size={14} /> {labels.neonBloom}
               </span>
               <div className={cn("h-4 w-8 rounded-full p-0.5 transition-colors", glow ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700")}>
                 <motion.div animate={{ x: glow ? 16 : 0 }} className="h-3 w-3 rounded-full bg-white shadow-sm" />
               </div>
             </button>
          </div>

          {/* Code Output (Hidden on very small screens to save space) */}
          <div className="hidden rounded-lg border border-slate-200 bg-slate-100 p-4 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-black sm:block">
             <div className="mb-2 border-b border-slate-300 pb-2 dark:border-slate-700"> transform-style: preserve-3d; </div>
             <div className="opacity-70">
               translateZ({spread * 2}px); <br/>
               rotateX(<span className="text-emerald-500">dynamic</span>); <br/>
               rotateY(<span className="text-emerald-500">dynamic</span>); <br/>
               {wireframe ? 'stroke: current;' : 'fill: current;'}
             </div>
          </div>

        </div>
      </div>

      {/* --- RIGHT: HOLOGRAPHIC CANVAS --- */}
      <div className="relative flex min-h-[350px] flex-1 items-center justify-center overflow-hidden bg-slate-50 p-4 dark:bg-[#050505] lg:min-h-0">
        
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" 
          style={{ 
            backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-100/50 dark:to-[#050505]" />

        <HolographicLogo spread={spread} wireframe={wireframe} glow={glow} />

        <div className="pointer-events-none absolute bottom-6 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 opacity-50">
          {labels.interactivePreview}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                        6. 3D LOGO COMPONENT (CORE)                         */
/* -------------------------------------------------------------------------- */

function HolographicLogo({ spread, wireframe, glow }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Handle both Mouse and Touch events
  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Check if it's a touch event or mouse event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const mX = clientX - rect.left;
    const mY = clientY - rect.top;
    
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      // FIX 2: Changed fixed 400px to percentage based width with constraints
      className="relative flex h-[300px] w-full max-w-[300px] items-center justify-center sm:h-[400px] sm:max-w-[400px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove} // Added touch support for mobile
      onTouchEnd={handleLeave}
      style={{ 
        perspective: 1000, 
        transformStyle: "preserve-3d",
        cursor: "grab"
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-48 w-48 sm:h-64 sm:w-64" // Also scaled down inner container slightly for mobile
      >
        {logoLayers.map((layer, i) => (
           <LogoLayer 
             key={layer.id} 
             layer={layer} 
             depthIndex={i} 
             spread={spread} 
             wireframe={wireframe}
             glow={glow}
           />
        ))}

        {glow && (
          <motion.div 
             style={{ translateZ: -50 }}
             className="absolute inset-0 -z-10 rounded-full bg-emerald-500/20 blur-[60px] sm:blur-[80px]" 
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function LogoLayer({ layer, depthIndex, spread, wireframe, glow }) {
  // Calculate dynamic Z position based on spread slider
  // Base distance + (Spread Multiplier * Layer Index)
  const zValue = layer.z + (spread * (depthIndex + 1) * 1.5);

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      style={{ translateZ: zValue }}
      animate={{ translateZ: zValue }} // Animate smoothly when slider changes
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <svg viewBox="0 0 1000 1000" className="h-full w-full overflow-visible">
        {layer.paths.map((d, idx) => (
          <motion.path
            key={idx}
            d={d}
            initial={false}
            animate={{
              fill: wireframe ? "transparent" : (glow ? "#10b981" : "#0f172a"), // Emerald if glow, Slate if not
              stroke: wireframe ? "#10b981" : "transparent",
              strokeWidth: wireframe ? 10 : 0,
              fillOpacity: wireframe ? 0 : (glow ? 0.9 : 1) // Slightly transparent if glowing
            }}
            transition={{ duration: 0.3 }}
            style={{
              filter: glow ? "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))" : "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
            }}
            className="dark:fill-emerald-400 dark:text-emerald-400" 
          />
        ))}
      </svg>
    </motion.div>
  );
}
