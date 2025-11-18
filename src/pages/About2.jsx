import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  LayoutPanelTop, 
  PenTool, 
  Terminal, 
  Cpu, 
  Wifi, 
  Smartphone, 
  Monitor, 
  Layers, 
  Palette,
  Maximize2,
  Minimize2,
  Move
} from 'lucide-react';
import { cn } from '@/lib/utils';
// Assuming this path exists based on your previous file. 
// If not, the terminal will fallback gracefully.
import { terminalCommands } from '@/data/terminal-commands';

// --- CONFIGURATION ---
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
  // Add others as needed...
};

export default function AboutPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState('backend');
  const tabs = t('about.tabs', { returnObjects: true }) || {};

  return (
    <div className="min-h-screen w-full space-y-8 px-2 py-8 sm:px-4 md:py-12">
      
      {/* --- HEADER & NAVIGATION --- */}
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
            {tabConfig.map(({ value, icon: Icon }) => (
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
                  <span className="hidden sm:inline">{tabs[value] || value}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <section className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {active === 'backend' && <BackendWindow />}
            {active === 'frontend' && <FrontendWindow t={t} />}
            {active === 'designer' && <DesignerWindow />}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           1. BACKEND (TERMINAL)                            */
/* -------------------------------------------------------------------------- */

function BackendWindow() {
  return (
    <div className="grid h-[600px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0c0c0c] shadow-2xl md:grid-cols-[240px_1fr] md:h-[65vh]">
      {/* Sidebar Stats (Decorative) */}
      <div className="hidden h-full flex-col border-r border-white/10 bg-white/5 p-4 md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <Terminal size={18} />
            <span className="font-mono text-xs font-bold tracking-widest">SYSTEM_ROOT</span>
          </div>
          
          <div className="space-y-4 font-mono text-[10px] text-slate-400">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>CPU_USAGE</span>
                <span className="text-emerald-500">12%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div 
                  animate={{ width: ["10%", "30%", "12%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-emerald-500" 
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>MEMORY</span>
                <span className="text-amber-500">424MB</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[40%] bg-amber-500" />
              </div>
            </div>

            <div className="pt-4">
               <p className="mb-2 text-xs font-bold text-slate-300">Active Processes:</p>
               <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-emerald-300/80">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   node_server
                 </li>
                 <li className="flex items-center gap-2 text-slate-500">
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                   docker_daemon
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Area - FIXED HEIGHT & SCROLLING FIX */}
      <div className="relative flex h-full flex-col bg-[#0A0A0A] overflow-hidden">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Wifi size={10} />
            SSH: connected
          </div>
        </div>

        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

        <InteractiveTerminal />
      </div>
    </div>
  );
}

function InteractiveTerminal() {
  const initialEntries = [
    { type: 'banner', text: "Younes Interactive Shell v2.0.4" },
    { type: 'text', text: 'Connected to remote instance.' },
    { type: 'text', text: 'Type "help" to view available commands.' },
  ];
  const [entries, setEntries] = useState(initialEntries);
  const [command, setCommand] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when entries change
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
      setEntries([{ type: 'text', text: 'Console cleared.' }]);
      return;
    }

    const commandEntry = { type: 'command', text: `guest@portfolio:~$ ${value}` };
    
    // Safe lookup
    const lookup = terminalCommands ? terminalCommands[normalized] : null;

    let responseEntries;
    if (lookup) {
        responseEntries = lookup.output.map((line) => ({ type: 'text', text: line }));
    } else {
        responseEntries = [{ type: 'error', text: `Command not found: ${value}. Try "help".` }];
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
      className="relative z-0 flex h-full flex-col p-4 font-mono text-sm md:text-base overflow-hidden" 
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
              entry.type === 'text' && 'text-slate-200 leading-relaxed'
            )}>
              {entry.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input Area (Fixed at bottom) */}
      <form onSubmit={handleSubmit} className="mt-2 flex shrink-0 items-center border-t border-white/5 pt-2">
        <span className="mr-2 text-emerald-500">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
        <div className="h-4 w-2 animate-pulse bg-emerald-500" />
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           2. FRONTEND (SLIDER)                             */
/* -------------------------------------------------------------------------- */

function FrontendWindow({ t }) {
  const [activeDevice, setActiveDevice] = useState('desktop');
  
  // Default example
  const heroExample = sketchPlaceholders.hero || {
    desktopSketch: "/api/placeholder/1920/1080",
    desktopFinal: "/api/placeholder/1920/1080",
    mobileSketch: "/api/placeholder/375/812",
    mobileFinal: "/api/placeholder/375/812"
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-xl backdrop-blur-sm dark:border-white/5 dark:bg-slate-900/50">
      
      {/* Controls Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">UI Compilation Process</h2>
          <p className="text-sm text-slate-500">Drag slider to compare Wireframe vs. Production.</p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-950">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeDevice === 'desktop' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <Monitor size={14} /> Desktop
          </button>
          <button
            onClick={() => setActiveDevice('mobile')}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeDevice === 'mobile' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            <Smartphone size={14} /> Mobile
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center rounded-2xl border border-slate-200 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-white p-4 shadow-inner dark:border-white/10 dark:bg-[#050505] sm:p-8">
        <CompareSlider 
          device={activeDevice}
          beforeSrc={activeDevice === 'desktop' ? heroExample.desktopSketch : heroExample.mobileSketch}
          afterSrc={activeDevice === 'desktop' ? heroExample.desktopFinal : heroExample.mobileFinal}
        />
      </div>
    </div>
  );
}

function CompareSlider({ device, beforeSrc, afterSrc }) {
  const [percent, setPercent] = useState(50);
  const sliderRef = useRef(null);
  const isDesktop = device === 'desktop';

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
        "relative select-none overflow-hidden shadow-2xl",
        isDesktop ? "aspect-video w-full max-w-3xl rounded-lg" : "aspect-[9/19.5] w-full max-w-[320px] rounded-[2.5rem] border-4 border-slate-800 dark:border-slate-700"
      )}
      ref={sliderRef}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* AFTER IMAGE (Background) */}
      <img src={afterSrc} alt="Final" className="absolute inset-0 h-full w-full object-cover" draggable="false" />
      
      {/* LABEL (Production) */}
      <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur">
        Rendered
      </div>

      {/* BEFORE IMAGE (Clipped) */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img src={beforeSrc} alt="Sketch" className="absolute inset-0 h-full w-full object-cover grayscale filter" draggable="false" />
        <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" /> {/* Blueprint tint */}
        
        {/* LABEL (Sketch) */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur">
          Blueprint
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
/*                           3. DESIGNER (AI WORKSPACE)                       */
/* -------------------------------------------------------------------------- */

function DesignerWindow() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl dark:border-slate-700 dark:bg-[#1e1e1e]">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      {/* Top Toolbar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-[#252525]">
        <div className="flex items-center gap-4">
           <div className="flex gap-1">
              <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600" />
           </div>
           <div className="text-xs font-medium text-slate-500">Untitled_Design_v04.fig</div>
        </div>
        <div className="flex gap-2 text-slate-400">
          <span className="text-xs">100%</span>
          <Minimize2 size={14} />
        </div>
      </div>

      {/* Left Floating Tools */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute left-4 top-16 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-600 dark:bg-[#252525]"
      >
        {[Move, Layers, Palette, PenTool].map((Icon, i) => (
          <div key={i} className={cn("rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-700", i===0 && "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400")}>
            <Icon size={18} />
          </div>
        ))}
      </motion.div>

      {/* Right Properties Panel */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-4 right-4 top-16 w-48 rounded-lg border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-600 dark:bg-[#252525]"
      >
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Properties</div>
        <div className="space-y-3">
            <div className="h-2 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-8 w-full rounded border border-slate-200 dark:border-slate-600" />
            <div className="h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 rounded bg-slate-100 dark:bg-slate-700" />
              <div className="h-8 rounded bg-slate-100 dark:bg-slate-700" />
            </div>
        </div>
      </motion.div>

      {/* Center Artboard (Parallax Effect) */}
      <div className="flex h-full w-full items-center justify-center">
        <motion.div 
          whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
          className="relative h-96 w-80 bg-white p-8 shadow-2xl dark:bg-[#111]"
          style={{ perspective: 1000 }}
        >
          <div className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-br from-emerald-400/30 to-blue-500/30 blur-xl" />
          
          {/* Mock UI Content */}
          <div className="space-y-6">
             <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500" />
             <div className="space-y-2">
               <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
               <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800" />
               <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800" />
             </div>
          </div>

          {/* Floating Cursor */}
          <motion.div 
            animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute z-20"
          >
            <Move className="h-6 w-6 -rotate-90 fill-rose-500 text-rose-500 drop-shadow-md" />
            <div className="ml-4 rounded-md bg-rose-500 px-2 py-0.5 text-[10px] text-white">
              Younes
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}