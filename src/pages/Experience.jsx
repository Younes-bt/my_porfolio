import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Cpu, Network, GraduationCap, Lightbulb, 
  Code2, Terminal, CheckCircle2, Zap, 
  Server, PenTool, BrainCircuit 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// --- DATA: THE SYSTEM LOGS ---
const defaultExperience = [
  {
    id: 'opicom',
    role: 'Founder & Lead Architect',
    company: 'OPICOM Tech',
    period: 'In Progress',
    type: 'Vision Module',
    icon: BrainCircuit,
    color: 'emerald',
    desc: "The foundation of my future studio. Bringing together tech, design, and civic transparency to create real impact for local businesses. It's not just a company; it's a mission to modernize my community step by step.",
    tags: ['Vision', 'Leadership', 'R&D', 'Civic Tech']
  },
  {
    id: 'freelance',
    role: 'Full-Stack Developer',
    company: 'Freelance / Independent',
    period: '3-4 Years',
    type: 'Core Processor',
    icon: Cpu,
    color: 'amber',
    desc: "Building real projects for real clients—from schools to researchers. I handle the entire lifecycle: Idea → Design → Development → Deployment. I learned by doing, mastering tools like Django, React, and Tauri to solve actual problems.",
    tags: ['Full-Stack', 'Client Relations', 'Deployment', 'System Design']
  },
  {
    id: 'instructor',
    role: 'Tech Instructor',
    company: 'Various Schools',
    period: 'Part-Time',
    type: 'I/O Interface',
    icon: Network,
    color: 'blue',
    desc: "Teaching students and staff the basics of IT, Photoshop, and digital tools. Teaching improved my own code: it taught me patience, planning, and how to explain complex logic in simple terms.",
    tags: ['Mentorship', 'Communication', 'Digital Literacy', 'Design Tools']
  },
  {
    id: 'education',
    role: 'CS Degree + Self-Taught',
    company: 'University & CS50',
    period: 'Origin',
    type: 'Kernel',
    icon: GraduationCap,
    color: 'rose',
    desc: "Started with CS50 Harvard and fell in love with code. While I have a CS degree, my real education came from late nights documenting, debugging, and building. Self-taught in modern stacks like React Native and Data Engineering.",
    tags: ['Computer Science', 'Self-Learning', 'Research', 'Algorithms']
  }
];

const defaultAchievements = [
  { label: 'Real-World Projects Delivered', value: '10+', icon: Server },
  { label: 'First Open-Data Platform (Ksar)', value: 'LAUNCHED', icon: DatabaseIcon },
  { label: 'Stack Proficiency', value: 'HIGH', icon: Code2 },
  { label: 'AI Integration Workflow', value: 'ACTIVE', icon: Zap },
];

const iconMap = {
  BrainCircuit,
  Cpu,
  Network,
  GraduationCap,
  Server,
  Database: DatabaseIcon,
  Code2,
  Zap,
};

// Helper Icon for the array above
function DatabaseIcon(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>}


export default function ExperiencePage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const experienceStrings = t('experiencePage', { returnObjects: true }) || {};
  const timelineSource = Array.isArray(experienceStrings.timeline) ? experienceStrings.timeline : [];
  const timelineData =
    timelineSource.length > 0
      ? timelineSource
      : defaultExperience;
  const normalizedTimeline = timelineData.map((item, index) => {
    const fallback = defaultExperience[index] || defaultExperience[0];
    const iconComponent = iconMap[item.icon] || fallback.icon || BrainCircuit;
    return { ...fallback, ...item, icon: iconComponent };
  });
  const achievementsSource = Array.isArray(experienceStrings.achievements)
    ? experienceStrings.achievements
    : [];
  const achievementsData =
    achievementsSource.length > 0
      ? achievementsSource
      : defaultAchievements;
  const normalizedAchievements = achievementsData.map((item, index) => {
    const fallback = defaultAchievements[index] || defaultAchievements[0];
    const iconComponent = iconMap[item.icon] || fallback.icon || Server;
    return { ...fallback, ...item, icon: iconComponent };
  });
  const headerBadge = experienceStrings.badge || 'System Log';
  const titlePrimary = experienceStrings.title?.primary || 'Career';
  const titleAccent = experienceStrings.title?.accent || 'Trace';
  const headerSubtitle =
    experienceStrings.subtitle || '// EXECUTION_HISTORY: Tracking the evolution from student to founder.';
  const achievementsTitle = experienceStrings.achievementsTitle || 'System Benchmarks';
  const achievementsSubtitle = experienceStrings.achievementsSubtitle || 'Performance Analysis & Highlights';
  const achievementsFooter = experienceStrings.achievementsFooter || {
    id: 'ID: YOUNES-DEV-001',
    status: 'STATUS: READY_TO_WORK',
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505] px-4 py-16 selection:bg-emerald-500/30">
      
      {/* --- BACKGROUND: PCB TEXTURE --- */}
      <div className="fixed inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* HEADER: SYSTEM STATUS */}
        <header className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {headerBadge}
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            {titlePrimary}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm font-mono text-slate-500">
            {headerSubtitle}
          </p>
        </header>

        {/* --- THE CIRCUIT BOARD --- */}
        <div className="relative">
          
          {/* CENTRAL BUS (THE LINE) */}
          <div className="absolute left-4 top-0 bottom-0 w-1 md:left-1/2 md:-ml-0.5">
             {/* The darker track */}
             <div className="h-full w-full bg-slate-800/50" />
             {/* The glowing trace that fills up on scroll */}
             <motion.div 
               style={{ height: useScrollPath(scrollYProgress) }}
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
             />
          </div>

          {/* EXPERIENCE MODULES */}
          <div className="space-y-16 md:space-y-24">
            {normalizedTimeline.map((item, index) => (
              <CircuitModule key={item.id} item={item} index={index} />
            ))}
          </div>

        </div>

        {/* --- SYSTEM SPECS (ACHIEVEMENTS) --- */}
        <div className="mt-32">
          <AchievementsBoard
            data={normalizedAchievements}
            title={achievementsTitle}
            subtitle={achievementsSubtitle}
            footer={achievementsFooter}
          />
        </div>

      </div>
    </div>
  );
}

// --- COMPONENT: THE CIRCUIT MODULE (CARD) ---
function CircuitModule({ item, index }) {
  const isEven = index % 2 === 0;
  const Icon = item.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col md:flex-row items-start md:items-center gap-8",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      
      {/* 1. THE CONNECTION NODE (Center) */}
      <div className="absolute left-4 top-0 h-full md:left-1/2 md:top-auto">
         <div className="sticky top-1/2 -ml-[5.5px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-900 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]">
            <div className="h-1 w-1 rounded-full bg-white" />
         </div>
         {/* Horizontal Trace Connector */}
         <div className={cn(
           "absolute top-1/2 hidden h-0.5 w-8 bg-emerald-500/50 md:block",
           isEven ? "right-full mr-3" : "left-full ml-3"
         )} />
      </div>

      {/* 2. THE DATE/LABEL (Opposite Side) */}
      <div className={cn(
        "hidden flex-1 md:block",
        isEven ? "text-left" : "text-right"
      )}>
        <div className="inline-block rounded bg-slate-900/80 px-3 py-1 font-mono text-xs text-slate-400 border border-slate-800">
          {item.period}
        </div>
      </div>

      {/* 3. THE HARDWARE CARD (Content) */}
      <div className="ml-12 flex-1 md:ml-0">
        <div className={cn(
          "group relative overflow-hidden rounded-xl border border-slate-800 bg-[#0A0A0A] p-6 transition-all hover:border-emerald-500/30 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]",
          // Dynamic accent border based on color
          item.color === 'emerald' && "hover:border-emerald-500/50",
          item.color === 'amber' && "hover:border-amber-500/50",
          item.color === 'blue' && "hover:border-blue-500/50",
          item.color === 'rose' && "hover:border-rose-500/50",
        )}>
          
          {/* Decorative Screws */}
          <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-700" />

          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
             <div>
               <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{item.role}</h3>
               <p className={cn("text-sm font-medium", 
                 item.color === 'emerald' ? "text-emerald-500" : 
                 item.color === 'amber' ? "text-amber-500" : 
                 item.color === 'blue' ? "text-blue-500" : "text-rose-500"
               )}>@{item.company}</p>
             </div>
             <div className={cn(
               "flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 border border-slate-800",
               item.color === 'emerald' ? "text-emerald-500" : 
               item.color === 'amber' ? "text-amber-500" : 
               item.color === 'blue' ? "text-blue-500" : "text-rose-500"
             )}>
               <Icon size={20} />
             </div>
          </div>

          {/* Mobile Date (Visible only on small screens) */}
          <div className="mb-4 md:hidden">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-500 border border-slate-800">
              {item.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-400 mb-6">
            {item.desc}
          </p>

          {/* Tags / Chips */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 rounded bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500 border border-slate-800 group-hover:border-slate-700 transition-colors">
                <Terminal size={8} /> {tag}
              </span>
            ))}
          </div>

          {/* Serial Number Decal */}
          <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-10 transition-opacity rotate-12">
            <Icon size={120} />
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// --- COMPONENT: ACHIEVEMENTS BOARD (SPECS SHEET) ---
function AchievementsBoard({ data, title, subtitle, footer }) {
  const achievementList = data && data.length > 0 ? data : defaultAchievements;
  const footerInfo = footer || { id: 'ID: YOUNES-DEV-001', status: 'STATUS: READY_TO_WORK' };
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080808] p-8 relative overflow-hidden">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[length:100%_4px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] opacity-20" />
      
      <div className="relative z-10">
        <div className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
             <Zap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{title || 'System Benchmarks'}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {subtitle || 'Performance Analysis & Highlights'}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievementList.map((ach, i) => (
            <div key={i} className="group relative p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-colors">
               <div className="mb-3 text-slate-500 group-hover:text-emerald-500 transition-colors">
                 <ach.icon size={20} />
               </div>
               <div className="text-2xl font-black text-white mb-1">{ach.value}</div>
               <div className="text-xs font-mono text-slate-400">{ach.label}</div>
            </div>
          ))}
        </div>
        
        {/* Bottom Code Snippet decoration */}
        <div className="mt-8 flex items-center justify-between font-mono text-[10px] text-slate-600">
          <span>{footerInfo.id}</span>
          <span>{footerInfo.status}</span>
        </div>
      </div>
    </div>
  );
}

// Hook to transform scroll progress to % height
function useScrollPath(scrollYProgress) {
  return useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
}
