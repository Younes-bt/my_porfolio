import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

const terminalScript = [
  { tokens: [{ text: '$ welcome...', className: 'text-emerald-300' }] },
  {
    tokens: [
      { text: '$ you just reached my ', className: 'text-slate-300' },
      { text: 'portfolio', className: 'text-amber-300' },
      { text: '.', className: 'text-slate-300' },
    ],
  },
  { tokens: [{ text: '$ wondering who I am and what I can do?', className: 'text-slate-300' }] },
  { tokens: [{ text: '$ ...well', className: 'text-pink-400' }] },
  {
    tokens: [
      { text: "$ I'm ", className: 'text-slate-300' },
      { text: 'younes', className: 'text-emerald-300 font-semibold' },
      { text: ' -> full-stack developer,', className: 'text-slate-300' },
    ],
  },
  { tokens: [{ text: '$ and graphic designer for fun.', className: 'text-slate-300' }] },
  { tokens: [{ text: '$', className: 'text-slate-500' }] },
  { tokens: [{ text: '$ you can open my full resume here:', className: 'text-slate-300' }] },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-300' },
      { text: '[ resume ]', className: 'text-amber-300' },
    ],
  },
  { tokens: [{ text: '$', className: 'text-slate-500' }] },
  { tokens: [{ text: '$ or jump directly to my projects here:', className: 'text-slate-300' }] },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-300' },
      { text: '[ projects ]', className: 'text-amber-300' },
    ],
  },
  { tokens: [{ text: '$', className: 'text-slate-500' }] },
  {
    tokens: [
      {
        text: '$ current_focus: building school & civic-tech tools in Morocco.',
        className: 'text-slate-300',
      },
    ],
  },
  { tokens: [{ text: '$', className: 'text-emerald-300' }] },
  { tokens: [{ text: '$', className: 'text-emerald-300' }] },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-400' },
      { text: '_', className: 'text-slate-400', isCursor: true },
    ],
  },
];

export default function HomePage() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true });

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-gradient-to-br from-white via-blue-50/70 to-slate-100 px-3 py-8 shadow-2xl shadow-slate-900/10 transition-colors dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900/30 dark:shadow-slate-900/60 sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-md flex-col gap-5 sm:max-w-none sm:grid sm:gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[24px] border border-slate-900/20 bg-slate-950 text-slate-100 shadow-2xl dark:border-white/10 sm:rounded-[28px]"
          >
            <div className="flex items-center gap-2 rounded-t-[24px] border-b border-white/5 px-4 py-3 sm:rounded-t-[28px] sm:px-6">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <p className="ml-auto font-mono text-xs text-slate-400">portfolio.sh</p>
            </div>
            <TerminalTyping />
            <div className="absolute -right-5 top-1/2 hidden h-px w-10 -translate-y-1/2 bg-slate-400/60 lg:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[24px] border border-slate-900/10 bg-white/80 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70 sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between rounded-t-[24px] border-b border-slate-900/10 px-4 py-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:rounded-t-[28px] sm:px-6">
              <span>profile.exe</span>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="h-1.5 w-6 rounded-full bg-slate-200 dark:bg-white/20" />
                <span className="h-3 w-3 rounded-full border border-slate-300 dark:border-white/30" />
                <span className="h-3 w-3 rounded-full border border-slate-300 dark:border-white/30" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 px-5 py-6 text-center sm:px-6 sm:py-8">
              <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/20 shadow-xl dark:border-white/10">
                <img src="/me.png" alt="Younes portrait" className="h-40 w-40 object-cover" />
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-300">Hello,</p>
                <h1 className="text-3xl font-display text-slate-900 dark:text-white">
                  I am <span className="text-emerald-500 dark:text-emerald-300">YOUNES EL BETTATE</span>
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300">
                  Full stack developer and Graphic Designer for FUN.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg">
                    <Link to="/projects" className="flex items-center gap-2">
                      {t('hero.primaryCta')}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link to="/contact" className="flex items-center gap-2">
                      Hire Me
                      <Star className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-300">
              {t('projects.title')}
            </p>
            <h2 className="text-3xl font-display text-slate-900 transition-colors dark:text-white">
              {t('projects.subtitle')}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col border-slate-900/10 bg-white/80 text-slate-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 dark:text-white">{project.title}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>{project.metrics}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="default"
                          className="bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" asChild>
              <Link
                to="/projects"
                className="flex items-center gap-2 text-slate-700 transition-colors dark:text-slate-200"
              >
                {t('hero.primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function TerminalTyping() {
  const [visibleChars, setVisibleChars] = useState(0);

  const lineMetrics = useMemo(() => {
    let offset = 0;
    return terminalScript.map((line) => {
      let tokenOffset = 0;
      const tokenOffsets = line.tokens.map((token) => {
        const current = tokenOffset;
        tokenOffset += token.text.length;
        return current;
      });
      const length = tokenOffset;
      const meta = { offset, length, tokenOffsets };
      offset += length + 1; // add a slight pause between lines
      return meta;
    });
  }, []);

  const totalChars =
    lineMetrics.length > 0
      ? lineMetrics[lineMetrics.length - 1].offset + lineMetrics[lineMetrics.length - 1].length
      : 0;

  useEffect(() => {
    if (!totalChars) return;

    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= totalChars) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [totalChars]);

  return (
    <div className="space-y-2 px-4 py-5 font-mono text-sm leading-relaxed text-slate-300 sm:px-6 sm:py-6">
      {terminalScript.map((line, lineIndex) => {
        const metrics = lineMetrics[lineIndex];
        const visibleInLine = metrics
          ? Math.min(Math.max(visibleChars - metrics.offset, 0), metrics.length)
          : 0;

        return (
          <div key={`line-${lineIndex}`} className="min-h-[1.35rem]">
            {line.tokens.map((token, tokenIndex) => {
              const tokenOffset = metrics?.tokenOffsets[tokenIndex] ?? 0;
              const visibleInToken = Math.min(
                Math.max(visibleInLine - tokenOffset, 0),
                token.text.length
              );

              if (visibleInToken <= 0) {
                return null;
              }

              const isCursor = token.isCursor && visibleInToken === token.text.length;

              return (
                <span
                  key={`token-${lineIndex}-${tokenIndex}`}
                  className={cn(
                    token.className,
                    token.isCursor && isCursor && 'animate-[blink_1s_steps(2,start)_infinite]'
                  )}
                >
                  {token.text.slice(0, visibleInToken)}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
