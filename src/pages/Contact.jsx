import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Github, Linkedin, Twitter, Phone, 
  MapPin, Copy, ExternalLink, CheckCircle2, 
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- CONFIGURATION: THE NETWORK NODES ---
const contacts = [
  {
    id: 'email',
    label: 'Email',
    value: 'hello@opicom.tech',
    type: 'copy',
    icon: Mail,
    color: 'emerald', 
    x: 0,    
    y: -140, 
    delay: 0
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/opicomtech', 
    href: 'https://github.com/opicomtech',
    type: 'link',
    icon: Github,
    color: 'slate',
    x: 130,
    y: -80,
    delay: 0.5
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'in/younes-elbettate',
    href: 'https://linkedin.com/in/younes-elbettate',
    type: 'link',
    icon: Linkedin,
    color: 'blue',
    x: 130,
    y: 80,
    delay: 1
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    value: '@younes.codes',
    href: 'https://twitter.com',
    type: 'link',
    icon: Twitter,
    color: 'sky',
    x: 0,
    y: 140,
    delay: 1.5
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+212 6XX-XXXXXX',
    type: 'copy',
    icon: Phone,
    color: 'rose',
    x: -130,
    y: 80,
    delay: 2
  },
  {
    id: 'location',
    label: 'Base',
    value: 'Ksar El Kebir, Morocco',
    type: 'info',
    icon: MapPin,
    color: 'amber',
    x: -130,
    y: -80,
    delay: 2.5
  }
];

export default function ContactPage() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Africa/Casablanca', 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] selection:bg-emerald-500/30">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
      </div>

      {/* --- MAIN CONTENT LAYER --- */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        
        {/* Header */}
        <div className="mb-8 text-center lg:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-900/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Open for Opportunities
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
            Establish <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400">Uplink</span>
          </h1>
        </div>

        {/* 
            THE NEURAL NETWORK VISUALIZER 
            Changes:
            - scale-75 (Mobile): Keeps it small to fit screen
            - md:scale-100 (Tablet): Standard size
            - lg:scale-125 (Laptop): 25% bigger
            - xl:scale-150 (Desktop): 50% bigger
        */}
        <div className="scale-75 transition-transform duration-500 md:scale-100 lg:scale-125 xl:scale-150">
          <NeuralGraph />
        </div>

        {/* BOTTOM HUD */}
        <div className="mt-16 flex w-full max-w-md items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md lg:mt-24">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
               <Globe size={20} />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Local Time</span>
               <span className="font-mono text-lg font-bold text-white">{time}</span>
             </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col text-right">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</span>
             <span className="text-sm font-medium text-slate-300">Morocco (GMT+1)</span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          THE NEURAL GRAPH COMPONENT                        */
/* -------------------------------------------------------------------------- */

function NeuralGraph() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="relative flex h-[400px] w-full max-w-[400px] items-center justify-center md:h-[500px] md:max-w-[500px]">
      
      {/* SVG LAYER: THE TETHERS */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
            <stop offset="50%" stopColor="rgba(16, 185, 129, 0.4)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
          </linearGradient>
        </defs>
        {contacts.map((contact) => (
          <TetherLine key={contact.id} contact={contact} isHovered={hoveredNode === contact.id} />
        ))}
      </svg>

      {/* CENTRAL CORE NODE */}
      <div className="relative z-20 flex h-24 w-24 items-center justify-center rounded-full bg-[#050505] border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-emerald-500/20 animate-[spin_15s_linear_infinite_reverse]" />
        <img src="/me.png" alt="Younes" className="h-full w-full rounded-full object-cover opacity-90" />
        
        <div className="absolute -bottom-8 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
           CORE_ONLINE
        </div>
      </div>

      {/* SATELLITE NODES */}
      {contacts.map((contact) => (
        <SatelliteNode 
          key={contact.id} 
          contact={contact} 
          onHover={setHoveredNode}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SUB-COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

function SatelliteNode({ contact, onHover }) {
  const [copied, setCopied] = useState(false);

  const handleInteraction = () => {
    if (contact.type === 'copy') {
      navigator.clipboard.writeText(contact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (contact.type === 'link') {
      window.open(contact.href, '_blank');
    }
  };

  const floatAnim = {
    y: [contact.y, contact.y - 10, contact.y],
    transition: {
      duration: 3 + contact.delay, 
      repeat: Infinity,
      ease: "easeInOut",
      delay: contact.delay
    }
  };

  const colorStyles = {
    emerald: "border-emerald-500 text-emerald-400 shadow-emerald-900/40 hover:bg-emerald-950/50",
    slate: "border-slate-500 text-slate-400 shadow-slate-900/40 hover:bg-slate-900/80",
    blue: "border-blue-500 text-blue-400 shadow-blue-900/40 hover:bg-blue-950/50",
    sky: "border-sky-500 text-sky-400 shadow-sky-900/40 hover:bg-sky-950/50",
    rose: "border-rose-500 text-rose-400 shadow-rose-900/40 hover:bg-rose-950/50",
    amber: "border-amber-500 text-amber-400 shadow-amber-900/40 hover:bg-amber-950/50",
  };

  return (
    <motion.button
      style={{ 
        position: 'absolute', 
        x: contact.x, 
      }}
      initial={{ y: contact.y }} 
      animate={floatAnim}        
      
      whileHover={{ scale: 1.1, zIndex: 50 }}
      onMouseEnter={() => onHover(contact.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleInteraction}
      
      className={cn(
        "group relative flex h-14 w-14 items-center justify-center rounded-full border bg-[#050505] shadow-[0_0_30px_-10px] transition-all duration-300",
        colorStyles[contact.color] || colorStyles.slate
      )}
    >
      <contact.icon size={24} />
      
      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <CheckCircle2 size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <div className="absolute top-full mt-3 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50">
        <div className="flex flex-col items-center">
           <div className="rounded-md border border-white/10 bg-black/80 px-3 py-1.5 backdrop-blur-md whitespace-nowrap">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{contact.label}</div>
              <div className="text-xs font-medium text-white font-mono flex items-center gap-2">
                {copied ? 'Copied to Clipboard!' : contact.value}
                {contact.type === 'link' && <ExternalLink size={10} />}
                {contact.type === 'copy' && !copied && <Copy size={10} />}
              </div>
           </div>
           <div className="h-2 w-px bg-gradient-to-b from-white/20 to-transparent -mt-px" />
        </div>
      </div>
      
    </motion.button>
  );
}

function TetherLine({ contact, isHovered }) {
  return (
    <motion.line
      x1="50%" 
      y1="50%"
      x2={`calc(50% + ${contact.x}px)`}
      animate={{
        y2: [`calc(50% + ${contact.y}px)`, `calc(50% + ${contact.y - 10}px)`, `calc(50% + ${contact.y}px)`]
      }}
      transition={{
        duration: 3 + contact.delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: contact.delay
      }}
      stroke="url(#line-gradient)"
      strokeWidth={isHovered ? 2 : 1}
      strokeOpacity={isHovered ? 1 : 0.3}
      className="transition-all duration-300"
    />
  );
}