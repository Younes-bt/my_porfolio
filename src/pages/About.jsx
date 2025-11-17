import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, LayoutPanelTop, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';
import { terminalCommands } from '@/data/terminal-commands';

const tabConfig = [
  { value: 'backend', icon: Code2 },
  { value: 'frontend', icon: LayoutPanelTop },
  { value: 'designer', icon: PenTool },
];

const sketchPlaceholders = {
  hero: {
    desktopSketch: '/sketches/hero-desktop-sketch.jpg',
    mobileSketch: '/sketches/hero-mobile-sketch.jpg',
    desktopFinal: '/sketches/hero-desktop.jpg',
    mobileFinal: '/sketches/hero-mobile.jpg',
  },
  about: {
    desktopSketch: '/sketches/about-desktop-sketch.jpg',
    mobileSketch: '/sketches/about-mobile-sketch.jpg',
    desktopFinal: '/sketches/about-desktop.jpg',
    mobileFinal: '/sketches/about-mobile.jpg',
  },
  projects: {
    desktopSketch: '/sketches/projects-desktop-sketch.jpg',
    mobileSketch: '/sketches/projects-mobile-sketch.jpg',
    desktopFinal: '/sketches/projects-desktop.jpg',
    mobileFinal: '/sketches/projects-mobile.jpg',
  },
  contact: {
    desktopSketch: '/sketches/contact-desktop-sketch.jpg',
    mobileSketch: '/sketches/contact-mobile-sketch.jpg',
    desktopFinal: '/sketches/contact-desktop.jpg',
    mobileFinal: '/sketches/contact-mobile.jpg',
  },
};


export default function AboutPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState('backend');
  const tabs = t('about.tabs', { returnObjects: true });

  return (
    <div className="space-y-12 px-1 sm:px-0">
      <section className="w-full">
        <div className="rounded-[30px] border border-slate-900/10 bg-white/80 p-6 shadow-2xl dark:border-white/10 dark:bg-slate-950">
          <div className="flex flex-wrap gap-3 pb-6">
            {tabConfig.map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActive(value)}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition sm:w-fit sm:justify-start',
                  active === value
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/60 dark:bg-emerald-400/10 dark:text-emerald-200'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 dark:border-white/20 dark:bg-slate-900 dark:text-slate-300'
                )}
              >
                <Icon className="h-4 w-4" />
                {tabs[value]}
              </button>
            ))}
          </div>
          {active === 'backend' && <BackendWindow />}
          {active === 'frontend' && <FrontendWindow t={t} />}
          {active === 'designer' && <DesignerWindow />}
        </div>
      </section>
    </div>
  );
}

function BackendWindow() {
  return (
    <div className="flex min-h-[60vh] max-h-[75vh] w-full flex-col overflow-hidden rounded-xl border border-slate-500/40 bg-zinc-950 text-emerald-100 shadow-inner sm:min-h-[70vh]">
      <div className="flex items-center gap-2 rounded-t-xl border-b border-white/10 px-4 py-3 text-xs text-white/60">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em]">younes_terminal.sh</span>
      </div>
      <InteractiveTerminal />
    </div>
  );
}

function InteractiveTerminal() {
  const initialEntries = [
    { type: 'banner', text: "Welcome to Younes' terminal portfolio" },
    { type: 'text', text: 'Type "help" to see available commands.' },
  ];
  const [entries, setEntries] = useState(initialEntries);
  const [command, setCommand] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = (raw) => {
    const value = raw.trim();
    if (!value) return;
    const normalized = value.toLowerCase();

    if (normalized === 'clear') {
      setEntries(initialEntries);
      return;
    }

    const commandEntry = { type: 'command', text: `visitor@younes.dev:~$ ${value}` };
    const lookup = terminalCommands[normalized];

    if (!lookup) {
      setEntries((prev) => [...prev, commandEntry, { type: 'text', text: `Command not found: ${value}` }]);
      return;
    }

    const responseEntries = lookup.output.map((line) => ({ type: 'text', text: line }));
    setEntries((prev) => [...prev, commandEntry, ...responseEntries]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runCommand(command);
    setCommand('');
  };

  return (
    <div className="flex flex-1 flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 font-mono leading-relaxed text-slate-200">
        {entries.map((entry, index) => (
          <p
            key={`${entry.text}-${index}`}
            className={cn(
              'break-words whitespace-pre-wrap text-xs md:text-lg',
              entry.type === 'banner' && 'text-emerald-300 font-semibold'
            )}
          >
            {entry.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="px-3 pb-4 font-mono text-sm text-emerald-200">
        <span className="text-emerald-400">visitor@younes.dev:~$ </span>
        <input
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          className="ml-2 bg-zinc-950 text-emerald-200 outline-none placeholder:text-emerald-200/80 caret-emerald-200"
          autoComplete="off"
          aria-label="terminal input"
        />
      </form>
    </div>
  );
}



function FrontendWindow({ t }) {
  const introTitle = t('frontend.introTitle');
  const introText = t('frontend.introText');
  const viewLabel = t('frontend.viewButton', 'View');
  const [activeExample, setActiveExample] = useState(null);

  const examples = [
    {
      key: 'hero',
      title: t('frontend.examples.hero.title'),
      caption: t('frontend.examples.hero.caption'),
      beforeDesktop: sketchPlaceholders.hero.desktopSketch,
      afterDesktop: sketchPlaceholders.hero.desktopFinal,
      beforeMobile: sketchPlaceholders.hero.mobileSketch,
      afterMobile: sketchPlaceholders.hero.mobileFinal,
    },
    {
      key: 'about',
      title: t('frontend.examples.about.title'),
      caption: t('frontend.examples.about.caption'),
      beforeDesktop: sketchPlaceholders.about.desktopSketch,
      afterDesktop: sketchPlaceholders.about.desktopFinal,
      beforeMobile: sketchPlaceholders.about.mobileSketch,
      afterMobile: sketchPlaceholders.about.mobileFinal,
    },
    {
      key: 'projects',
      title: t('frontend.examples.projects.title'),
      caption: t('frontend.examples.projects.caption'),
      beforeDesktop: sketchPlaceholders.projects.desktopSketch,
      afterDesktop: sketchPlaceholders.projects.desktopFinal,
      beforeMobile: sketchPlaceholders.projects.mobileSketch,
      afterMobile: sketchPlaceholders.projects.mobileFinal,
    },
    {
      key: 'contact',
      title: t('frontend.examples.contact.title'),
      caption: t('frontend.examples.contact.caption'),
      beforeDesktop: sketchPlaceholders.contact.desktopSketch,
      afterDesktop: sketchPlaceholders.contact.desktopFinal,
      beforeMobile: sketchPlaceholders.contact.mobileSketch,
      afterMobile: sketchPlaceholders.contact.mobileFinal,
    },
  ];

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white/80 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70 dark:text-white sm:mx-0 -mx-6 sm:p-4 p-2">
      <div className="flex items-center gap-2 rounded-t-[24px] border-b border-slate-950 px-3 py-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:border-white/10 dark:text-slate-300 sm:px-6">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span className="font-semibold">Sketch → UI</span>
      </div>
      <div className="space-y-8 px-2 py-4 sm:px-6 sm:py-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">{introTitle}</p>
          <p className="text-base text-slate-600 dark:text-slate-300">{introText}</p>
        </div>
        {examples.map((example) => (
          <section key={example.key} className="space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-3 dark:border-white/10 dark:bg-slate-950/40 sm:p-5">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{example.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">{example.caption}</p>
            </div>
            <div className="hidden items-stretch gap-6 md:grid" style={{ gridTemplateColumns: '3fr 1fr' }}>
              <CompareSlider device="desktop" beforeSrc={example.beforeDesktop} afterSrc={example.afterDesktop} fixedHeight />
              <CompareSlider device="mobile" beforeSrc={example.beforeMobile} afterSrc={example.afterMobile} fixedHeight />
            </div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setActiveExample(example)}
                className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-white bg-sky-300 dark:bg-sky-950 dark:hover:bg-white/10"
              >
                {viewLabel}
              </button>
            </div>
          </section>
        ))}
      </div>
      {activeExample && (
        <MobileComparisonModal
          example={activeExample}
          onClose={() => setActiveExample(null)}
          viewLabel={viewLabel}
        />
      )}
    </div>
  );
}


function CompareSlider({ device, beforeSrc, afterSrc, fixedHeight = false }) {
  const sliderRef = useRef(null);
  const [percent, setPercent] = useState(60);
  const isDesktop = device === 'desktop';

  const updatePercent = (clientX) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relative = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const next = (relative / rect.width) * 100;
    setPercent(Math.min(95, Math.max(5, next)));
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    updatePercent(event.clientX);
    const handleMove = (moveEvent) => updatePercent(moveEvent.clientX);
    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const sliderCore = (
    <div
      ref={sliderRef}
      className="relative w-full select-none"
      style={
        fixedHeight
          ? { height: isDesktop ? 700 : 750 }
          : { aspectRatio: isDesktop ? '16 / 9' : '9 / 16' }
      }
    >
      <img
        src={afterSrc}
        alt="Final UI"
        className={cn(
          'h-full w-full object-cover',
          isDesktop ? 'rounded-md' : 'rounded-[28px]'
        )}
        draggable={false}
      />
      <img
        src={beforeSrc}
        alt="Sketch placeholder"
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95',
          isDesktop ? 'rounded-md' : 'rounded-[28px]'
        )}
        draggable={false}
        style={{ clipPath: `inset(0 0 0 ${percent}% )` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-slate-200/80 dark:bg-white/40"
        style={{ left: `${percent}%`, transform: 'translateX(-0.5px)' }}
      />
      <button
        type="button"
        aria-label="Drag slider"
        onPointerDown={handlePointerDown}
        className="absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 -translate-x-1/2 touch-none items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-lg backdrop-blur dark:border-white/20 dark:bg-slate-800/85"
        style={{ left: `${percent}%` }}
      >
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-100">
          <span className="h-4 w-0.5 rounded-full bg-current" />
          <span className="h-4 w-0.5 rounded-full bg-current" />
        </div>
      </button>
    </div>
  );

  return (
    <div className="w-full overflow-x-auto">
      <FakeBrowserFrame variant={isDesktop ? 'browser' : 'phone'}>{sliderCore}</FakeBrowserFrame>
    </div>
  );
}

function MobileComparisonModal({ example, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!example) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 md:hidden" onClick={onClose}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-emerald-400">Sketch → UI</p>
            <h3 className="text-base font-semibold">{example.title}</h3>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.2em]"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          >
            Close
          </button>
        </div>
        <div
          className="flex-1"
          onClick={(event) => event.stopPropagation()}
        >
          <CompareSlider device="mobile" beforeSrc={example.beforeMobile} afterSrc={example.afterMobile} />
        </div>
      </div>
    </div>
  );
}

function FakeBrowserFrame({ children, variant = 'browser' }) {
  if (variant === 'phone') {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-lg dark:border-white/15 dark:bg-slate-950">
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-500/80 bg-white/60 shadow-inner dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex items-center gap-2 border-b border-slate-500 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:border-white/10 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span>before / after</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}



function DesignerWindow() {
  return (
    <div className="rounded-[24px] border border-slate-900/10 bg-slate-50 shadow-xl dark:border-white/10 dark:bg-slate-900">
      <div className="flex items-center gap-4 rounded-t-[24px] border-b border-slate-200 px-5 py-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-300">
        <span className="font-semibold uppercase tracking-[0.4em]">ai workspace</span>
        <div className="ml-auto flex gap-2">
          <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] dark:border-white/10">brush</span>
          <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] dark:border-white/10">type</span>
          <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] dark:border-white/10">motion</span>
        </div>
      </div>
      <div className="grid gap-5 p-6 md:grid-cols-[80px_1fr_160px]">
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow dark:border-white/10 dark:bg-slate-800">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-10 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600" />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-inner dark:border-white/20 dark:bg-slate-800/60">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Artboard</p>
          <h3 className="mt-4 text-3xl font-display text-slate-900 dark:text-white">Logo Ãƒâ€šÃ‚Â· Poster Ãƒâ€šÃ‚Â· Identity</h3>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500" />
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-300 to-pink-400" />
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-600" />
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-xs text-slate-500 shadow dark:border-white/10 dark:bg-slate-800 dark:text-slate-200">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Layers</p>
          {['Poster', 'Logo', 'Glow', 'Grid', 'Noise'].map((layer) => (
            <div key={layer} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 dark:border-white/10">
              <span>{layer}</span>
              <span className="text-slate-400">100%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
