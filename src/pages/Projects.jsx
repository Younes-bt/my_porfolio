import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ExternalLink, ChevronRight, ChevronLeft, 
  Cpu, Shield, Zap, Layers, Code2, MousePointer2, Lock, Loader2, ImageIcon 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// --- 1. DATA ---
const defaultProjects = [
  {
    id: 'ksar-data',
    title: 'Ksar-Data',
    subtitle: 'Open Data Platform',
    url: 'https://www.ksardata.com',
    date: '2024',
    embeddable: true, // This site allows iframes
    image: '/public/ksardata-screen.png', // Not needed if embeddable
    stack: ['React', 'ShadCN', 'Tailwind', 'Vercel'],
    desc: 'A civic-tech initiative bringing transparency to Ksar El Kebir. Visualizes municipal budgets and census data.',
    color: 'from-emerald-500 to-teal-900',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/50',
    shadow: 'shadow-emerald-500/20'
  },
  {
    id: 'tarik-school',
    title: 'Tarik Ibn Ziyad',
    subtitle: 'School Portal',
    url: 'https://www.tarikibnziyad.com',
    date: '2023',
    embeddable: true, // This site allows iframes
    image: '',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Static'],
    desc: 'Digital transformation for a traditional institution. A lightweight, bilingual platform connecting parents and students.',
    color: 'from-blue-600 to-indigo-900',
    accent: 'text-blue-400',
    border: 'border-blue-500/50',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: 'walid-portfolio',
    title: 'Walid Mouhan',
    subtitle: 'Academic Portfolio',
    url: 'https://www.walidmouhan.com',
    date: '2023',
    embeddable: false, // <--- BLOCKED BY X-FRAME-OPTIONS
    image: '/walid-screen.png', // You need to add a screenshot to your public folder
    stack: ['Django', 'Python', 'Tailwind', 'Render'],
    desc: 'Minimalist academic portfolio for a PhD Researcher. Focuses on content hierarchy and publication archiving.',
    color: 'from-amber-500 to-orange-900',
    accent: 'text-amber-400',
    border: 'border-amber-500/50',
    shadow: 'shadow-amber-500/20'
  }
];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const translatedProjects = t('projectsPage.items', { returnObjects: true });
  const projects =
    Array.isArray(translatedProjects) && translatedProjects.length > 0 ? translatedProjects : defaultProjects;
  const projectCount = projects.length || 1;
  const projectCopy = {
    projectLabel: t('projectsPage.projectLabel', { defaultValue: 'Project' }),
    systemArchitecture: t('projectsPage.systemArchitecture', { defaultValue: 'System Architecture' }),
    visitCta: t('projectsPage.visitCta', { defaultValue: 'Visit Live Site' }),
    interact: t('projectsPage.interact', { defaultValue: 'Interact' }),
    lock: t('projectsPage.lock', { defaultValue: 'Lock' }),
    imageLabel: t('projectsPage.imageLabel', { defaultValue: 'Img' }),
    interactHint: t('projectsPage.interactHint', { defaultValue: 'Click "Interact" to use site' }),
    imageMissing: t('projectsPage.imageMissing', { defaultValue: 'PREVIEW IMAGE NOT FOUND' }),
    externalPreview: t('projectsPage.externalPreview', { defaultValue: 'External Preview Only' }),
  };

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectCount);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectCount) % projectCount);
  };

  const activeProject = projects[currentIndex] || projects[0];

  useEffect(() => {
    if (currentIndex >= projectCount) {
      setCurrentIndex(0);
    }
  }, [projectCount, currentIndex]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-12 text-slate-200 selection:bg-white/20">
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#020204]" />
        <motion.div 
          animate={{ 
            background: `radial-gradient(circle at 50% 50%, ${activeProject.color.split(' ')[1].replace('to-', '')}40 0%, transparent 70%)` 
          }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-40 blur-[100px]"
        />
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }} 
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-12 lg:h-[80vh] lg:flex-row lg:gap-20">
        
        {/* --- LEFT: 3D CAROUSEL --- */}
        <div className="relative flex h-[500px] w-full max-w-md flex-col items-center justify-center perspective-1000">
          <div className="relative h-full w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <HoloCard 
                key={activeProject.id} 
                project={activeProject} 
                direction={direction} 
                copy={projectCopy}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-16 flex gap-4 z-50">
             <NavButton onClick={prevProject} icon={ChevronLeft} />
             <NavButton onClick={nextProject} icon={ChevronRight} />
          </div>
        </div>

        {/* --- RIGHT: DETAILS --- */}
        <div className="flex w-full max-w-lg flex-col justify-center pointer-events-none sm:pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-2 border-l-2 border-white/10 pl-6">
                <div className="flex items-center gap-3">
                   <span className={cn("text-xs font-bold uppercase tracking-widest", activeProject.accent)}>
                      {projectCopy.projectLabel} 0{currentIndex + 1}
                   </span>
                   <div className="h-px w-12 bg-white/10" />
                   <span className="text-xs text-slate-500">{activeProject.date}</span>
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                  {activeProject.title}
                </h1>
                <p className="text-lg font-light text-slate-400">{activeProject.subtitle}</p>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                <p className="leading-relaxed text-slate-300">
                  {activeProject.desc}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {projectCopy.systemArchitecture}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <div 
                      key={tech} 
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10"
                    >
                      {tech === 'React' && <Code2 size={12} />}
                      {tech === 'Tailwind' && <Layers size={12} />}
                      {tech === 'Vercel' && <Zap size={12} />}
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href={activeProject.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex w-fit items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-105",
                    "bg-gradient-to-r shadow-lg hover:shadow-xl", 
                    activeProject.color
                  )}
                >
                  {projectCopy.visitCta}
                  <ExternalLink size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         3D HOLO CARD COMPONENT                             */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                         3D HOLO CARD COMPONENT                             */
/* -------------------------------------------------------------------------- */

function HoloCard({ project, direction, copy }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false); 
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const {
    interact = 'Interact',
    lock = 'Lock',
    imageLabel = 'Img',
    interactHint = 'Click "Interact" to use site',
    imageMissing = 'PREVIEW IMAGE NOT FOUND',
    externalPreview = 'External Preview Only',
  } = copy || {};

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e) {
    if (isInteracting) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    x.set(mX / width - 0.5);
    y.set(mY / height - 0.5);
    setIsHovering(true);
  }

  function handleMouseLeave() {
    if (isInteracting) return;
    x.set(0);
    y.set(0);
    setIsHovering(false);
  }

  // Reset state when project changes
  useEffect(() => {
    setIsInteracting(false);
    setIframeLoaded(false);
    x.set(0);
    y.set(0);
  }, [project.id]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.5, type: "spring", bounce: 0.3 }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
      transition: { duration: 0.4 }
    })
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX: isInteracting ? 0 : rotateX,
          rotateY: isInteracting ? 0 : rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className={cn(
          "relative h-full w-full overflow-hidden rounded-3xl border bg-black/80 backdrop-blur-xl transition-all duration-500",
          project.border,
          project.shadow,
          isInteracting ? "scale-105 shadow-2xl" : ""
        )}
      >
        {/* Browser Toolbar */}
        <div className="relative z-20 flex h-10 items-center justify-between border-b border-white/10 bg-black/50 px-4 backdrop-blur-md">
           <div className="flex gap-2">
             <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
             <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
             <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
           </div>
           
           <div className="flex flex-1 justify-center px-4">
             <div className="flex w-full max-w-[200px] items-center justify-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] font-mono text-slate-400">
               <Shield size={10} /> 
               <span className="truncate">{new URL(project.url).hostname}</span>
             </div>
           </div>

           {/* INTERACTION BUTTON */}
           {project.embeddable ? (
             <button 
               onClick={() => setIsInteracting(!isInteracting)}
               className={cn(
                 "flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase transition-colors",
                 isInteracting ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
               )}
             >
               {isInteracting ? <Lock size={10} /> : <MousePointer2 size={10} />}
               {isInteracting ? lock : interact}
             </button>
           ) : (
             <div className="flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase text-slate-500 bg-white/5">
               <ImageIcon size={10} /> {imageLabel}
             </div>
           )}
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="relative h-[calc(100%-40px)] w-full bg-white/5 overflow-hidden">
           
           {project.embeddable ? (
             <>
               {/* IFRAME MODE */}
               {!iframeLoaded && (
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-emerald-500 z-20">
                    <Loader2 className="h-8 w-8 animate-spin" />
                 </div>
               )}
               
               {/* 
                  THE DESKTOP SCALING TRICK:
                  1. width/height: 300% -> Makes the iframe 3x larger (simulating desktop res)
                  2. transform: scale(0.333) -> Shrinks it back to fit the card container
               */}
               <iframe 
                 src={project.url}
                 className="absolute top-0 left-0 border-0 bg-white"
                 onLoad={() => setIframeLoaded(true)}
                 title={`${project.title} Preview`}
                 style={{ 
                    width: '300%', 
                    height: '300%', 
                    transform: 'scale(0.3333)',
                    transformOrigin: '0 0',
                    pointerEvents: isInteracting ? 'auto' : 'none' 
                 }} 
               />

               {/* Overlay for Tilt */}
               {!isInteracting && (
                 <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing bg-transparent" />
               )}
               {/* Overlay Hint */}
               <AnimatePresence>
                 {!isInteracting && isHovering && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur z-30"
                   >
                     {interactHint}
                   </motion.div>
                 )}
               </AnimatePresence>
             </>
           ) : (
             /* IMAGE FALLBACK MODE (unchanged) */
             <>
               <div className="relative h-full w-full bg-slate-900">
                 {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-full w-full object-cover" 
                    />
                 ) : (
                    <div className={cn("h-full w-full flex items-center justify-center bg-gradient-to-br", project.color)}>
                      <span className="font-mono text-xs text-white/50">{imageMissing}</span>
                    </div>
                 )}
                 {isHovering && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                   >
                      <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                        {externalPreview}
                      </div>
                   </motion.div>
                 )}
               </div>
             </>
           )}
        </div>

      </motion.div>
    </motion.div>
  );
}

function NavButton({ onClick, icon: Icon }) {
  return (
    <button 
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
    >
      <Icon size={24} />
    </button>
  );
}
