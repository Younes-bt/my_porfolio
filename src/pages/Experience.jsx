import { motion } from 'framer-motion';
import { Briefcase, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export default function ExperiencePage() {
  const { t } = useTranslation();
  const items = t('experience.items', { returnObjects: true });

  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{t('experience.title')}</p>
        <h1 className="text-4xl font-display text-white">{t('experience.subtitle')}</h1>
        <p className="text-base text-slate-400">{t('hero.subtitle')}</p>
      </div>
      <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-emerald-400/60 before:to-transparent">
        {items.map((item, index) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="relative mb-8 pl-6"
          >
            <div className="absolute left-[-34px] top-6 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-300 bg-slate-950">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <Card className="border-white/10 bg-slate-900/70">
              <CardContent className="space-y-3 py-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                    <Briefcase className="mr-2 inline h-4 w-4" />
                    {item.company}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <CalendarDays className="h-4 w-4" />
                    {item.period}
                  </div>
                </div>
                <h2 className="text-2xl font-display text-white">{item.title}</h2>
                <p className="text-slate-300">{item.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
