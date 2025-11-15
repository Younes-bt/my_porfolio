import { motion } from 'framer-motion';
import { Mail, CalendarCheck2, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      <div className="space-y-3 text-center md:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{t('contact.title')}</p>
        <h1 className="text-4xl font-display text-white">{t('contact.subtitle')}</h1>
        <p className="text-base text-slate-400">{t('hero.subtitle')}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-white/10 bg-slate-900/70">
          <CardContent className="grid gap-8 p-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Mail className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{t('contact.emailLabel')}</p>
              <a href="mailto:hello@example.com" className="text-2xl font-display text-white">
                hello@example.com
              </a>
            </div>
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/15 text-blue-200">
                <CalendarCheck2 className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{t('contact.statusLabel')}</p>
              <p className="text-lg text-white">{t('contact.availability')}</p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-400/15 text-pink-200">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{t('contact.locationLabel')}</p>
              <p className="text-lg text-slate-300">{t('contact.locationDescription')}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <Button size="lg" asChild>
          <a href="mailto:hello@example.com" className="flex items-center gap-2">
            {t('hero.secondaryCta')}
            <Send className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="ghost" size="lg" asChild>
          <a href="https://cal.com" target="_blank" rel="noreferrer" className="text-slate-200">
            {t('contact.ctaSchedule')}
          </a>
        </Button>
      </div>
    </div>
  );
}
