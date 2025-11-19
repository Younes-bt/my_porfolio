import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Star, Terminal as TerminalIcon, Code2, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/seo';

// --- CONFIGURATION ---
const defaultTerminalScript = [
  { text: 'Initializing system...', color: 'text-slate-500' },
  { text: 'Loading modules: [React, Node, Design]...', color: 'text-slate-400' },
  { text: '>> Access granted.', color: 'text-emerald-500' },
  { text: '', color: 'text-transparent' }, // Spacer
  { text: 'Hello, World! I am', color: 'text-slate-200' },
  { text: 'YOUNES', color: 'text-emerald-400 font-bold text-lg tracking-wider' },
  { text: 'Full-Stack Developer & UI Architect', color: 'text-blue-400' },
  { text: '', color: 'text-transparent' },
  { text: 'Current status:', color: 'text-slate-400' },
  { text: '-> Building digital experiences in Morocco.', color: 'text-amber-300' },
  { text: '-> Ready for new challenges.', color: 'text-emerald-300' },
];

export default function HomePage() {
  const { t } = useTranslation();
  const translatedTerminal = t('home2.terminal', { returnObjects: true }) || {};
  const terminalScript =
    Array.isArray(translatedTerminal.script) && translatedTerminal.script.length > 0
      ? translatedTerminal.script
      : defaultTerminalScript;
  const windowTitle = translatedTerminal.windowTitle || 'bash - dev_env';
  const portLabel = translatedTerminal.portLabel || 'Port: 3000';
  const statusLabel = translatedTerminal.status || 'Online';
  const glitchFallback = t('home2.glitchFallback') || 'Creative Developer';
  const glitchText = [t('hero.profile.title.prefix'), t('hero.profile.title.highlight')]
    .filter(Boolean)
    .join(' ')
    .trim() || glitchFallback;

  // Mouse position for the spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="relative min-h-[85vh] w-full overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#050505] transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      <SEO
        title="Home"
        description="Full-Stack Developer & UI Architect building digital experiences in Morocco."
      />

      {/* --- BACKGROUND EFFECTS --- */}
      <Spotlight mouseX={mouseX} mouseY={mouseY} />
      <GridPattern />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row lg:gap-20">

        {/* LEFT: THE TERMINAL (The Logic) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <TerminalWindow
            script={terminalScript}
            windowTitle={windowTitle}
            portLabel={portLabel}
            statusLabel={statusLabel}
          />
        </motion.div>

        {/* RIGHT: THE PROFILE (The Human) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex w-full max-w-lg flex-col items-center text-center lg:items-start lg:text-left"
        >
          <ProfileSection t={t} glitchText={glitchText || glitchFallback} />
        </motion.div>

      </div>

      {/* --- DECORATIVE FLOATING ICONS --- */}
      <FloatingIcons />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function ProfileSection({ t, glitchText }) {
  return (
    <div className="space-y-8">
      {/* Avatar with glowing pulsing ring */}
      <div className="relative mx-auto lg:mx-0">
        <div className="absolute -inset-4 animate-pulse rounded-full bg-emerald-500/20 blur-xl dark:bg-emerald-500/10" />
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <img src="/me.png" alt="Profile" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-white dark:ring-[#050505]">
          <Code2 size={16} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-mono text-sm font-medium text-emerald-600 dark:text-emerald-400">
            // {t('hero.profile.greeting') || "WELCOME TO MY PORTFOLIO"}
          </p>

          {/* Glitch Text Effect Component */}
          <GlitchText text={glitchText} />

          <p className="max-w-md text-slate-600 dark:text-slate-400">
            {t('hero.profile.role') || "I craft high-performance applications with a focus on user experience and clean architecture."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500"
          >
            <Link to="/projects" className="group flex items-center gap-2">
              {t('hero.primaryCta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="border-slate-300 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800">
            <Link to="/contact" className="flex items-center gap-2">
              {t('hero.secondaryCta')}
              <Star className="h-4 w-4 text-amber-400" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function TerminalWindow({ script, windowTitle = 'bash - dev_env', portLabel = 'Port: 3000', statusLabel = 'Online' }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0F1115]">
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-white/5">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <TerminalIcon size={12} />
          <span>{windowTitle}</span>
        </div>
        <div className="w-12" /> {/* Spacer for balance */}
      </div>

      {/* Terminal Content */}
      <div className="min-h-[300px] p-6 font-mono text-sm leading-7">
        <TerminalTyper lines={script} />
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-[#0A0A0A]">
        <span>{portLabel}</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

function TerminalTyper({ lines }) {
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentText = "";
    let interval;

    const type = () => {
      if (currentLineIndex >= lines.length) {
        clearInterval(interval);
        return;
      }

      const line = lines[currentLineIndex];

      // Fast forward empty lines
      if (line.text === "") {
        setDisplayedLines(prev => [...prev, { ...line, text: "" }]);
        currentLineIndex++;
        currentCharIndex = 0;
        currentText = "";
        return;
      }

      currentText += line.text[currentCharIndex];

      setDisplayedLines(prev => {
        const newLines = [...prev];
        if (newLines[currentLineIndex]) {
          newLines[currentLineIndex] = { ...line, text: currentText };
        } else {
          newLines.push({ ...line, text: currentText });
        }
        return newLines;
      });

      currentCharIndex++;

      if (currentCharIndex >= line.text.length) {
        currentLineIndex++;
        currentCharIndex = 0;
        currentText = "";
      }
    };

    interval = setInterval(type, 20); // Typing speed
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="space-y-1">
      {displayedLines.map((line, i) => (
        <div key={i} className={cn("break-words", line.color)}>
          <span className="mr-2 opacity-50">$</span>
          {line.text}
        </div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block h-4 w-2 bg-emerald-500 align-middle"
      />
    </div>
  );
}

function Spotlight({ mouseX, mouseY }) {
  return (
    <motion.div
      className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300 opacity-50 dark:opacity-100"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(16, 185, 129, 0.10),
            transparent 80%
          )
        `,
      }}
    />
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0 z-0 opacity-[0.3] dark:opacity-[0.2]"
      style={{
        backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
      }}
    >
      {/* This creates the faint grid lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-[#050505]/50 dark:to-[#050505]" />
    </div>
  );
}

function GlitchText({ text = "Creative Developer" }) {
  return (
    <div className="group relative inline-block">
      <h1 className="relative z-10 text-4xl font-black uppercase text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
        {text}
      </h1>
      <span className="absolute left-0 top-0 -z-10 block text-4xl font-black uppercase text-emerald-500 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 md:text-5xl lg:text-6xl">
        {text}
      </span>
      <span className="absolute left-0 top-0 -z-10 block text-4xl font-black uppercase text-rose-500 opacity-0 transition-all duration-200 delay-75 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-100 md:text-5xl lg:text-6xl">
        {text}
      </span>
    </div>
  );
}

function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] text-slate-300 dark:text-slate-800"
      >
        <Cpu size={120} strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] bottom-[20%] text-slate-300 dark:text-slate-800"
      >
        <Globe size={150} strokeWidth={1} />
      </motion.div>
    </div>
  );
}
