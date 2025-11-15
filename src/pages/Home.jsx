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

  { tokens: [{ text: '$ you can open my full resume here:', className: 'text-slate-300' }] },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-300' },
      { text: '[ resume ]', className: 'text-amber-300' },
    ],
  },
  { tokens: [{ text: '$ or jump directly to my projects here:', className: 'text-slate-300' }] },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-300' },
      { text: '[ projects ]', className: 'text-amber-300' },
    ],
  },

  {
    tokens: [
      {
        text: '$ current_focus: building school & civic-tech tools in Morocco.',
        className: 'text-slate-300',
      },
    ],
  },
  {
    tokens: [
      { text: '$ ', className: 'text-slate-400' },
      { text: '_', className: 'text-slate-400', isCursor: true },
    ],
  },
];

export default function HomePage() {
  const { t } = useTranslation();
  const story = t('story', { returnObjects: true });

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
            <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-slate-300 lg:flex">
              <span className="h-px w-10 bg-slate-400/60" />
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="lg:hidden">
              <div className="flex flex-col items-center gap-1 py-4 text-emerald-400">
                <span className="h-px w-12 bg-emerald-400/40" />
                <ArrowRight className="h-5 w-5 rotate-90" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[24px] border border-slate-900/10 bg-white/80 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70 sm:rounded-[28px]"
          >
            <div className="flex items-center justify-between rounded-t-[24px] border-b border-slate-900/10 px-4 py-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:rounded-t-[28px] sm:px-6">
              <span>profile.HTML</span>
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
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-500 dark:text-emerald-300">
                  {t('hero.profile.greeting')}
                </p>
                <h1 className="text-3xl font-display text-slate-900 dark:text-white">
                  {t('hero.profile.title.prefix')}{' '}
                  <span className="text-emerald-500 dark:text-emerald-300">{t('hero.profile.title.highlight')}</span>
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300">{t('hero.profile.role')}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg">
                    <Link to="/projects" className="flex items-center gap-2">
                      {t('hero.primaryCta')}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link to="/contact" className="flex items-center gap-2">
                      {t('hero.profile.hireCta')}
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
        <section className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-gradient-to-br from-white via-emerald-50/40 to-blue-50 px-6 py-12 shadow-2xl shadow-slate-900/10 transition-colors dark:border-white/10 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900/40 dark:shadow-slate-900/60 md:px-16">
          <div className="absolute inset-0 opacity-50 blur-3xl dark:opacity-20" aria-hidden>
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-emerald-500/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-sky-400/20 to-transparent" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-500 dark:text-emerald-300">
                {story.eyebrow}
              </p>
              <h2 className="text-3xl font-display text-slate-900 dark:text-white">{story.title}</h2>
              <div className="rounded-3xl border border-slate-900/10 bg-white/70 p-6 text-base text-slate-700 shadow-lg dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200">
                {story.body?.[0]}
              </div>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              {story.body?.slice(1).map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 15) + index}
                  className="rounded-2xl border border-transparent bg-white/70 p-5 shadow dark:bg-white/5"
                >
                  {paragraph}
                </p>
              ))}
              <div className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-6 text-lg font-display text-emerald-700 shadow-lg dark:border-emerald-400/50 dark:bg-emerald-400/10 dark:text-emerald-200">
                {story.closing}
              </div>
            </div>
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
