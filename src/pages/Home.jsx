import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/motion/reveal';

export default function HomePage() {
  const { t } = useTranslation();
  const stats = t('stats', { returnObjects: true });
  const projects = t('projects.items', { returnObjects: true });

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900/20 px-8 py-16 shadow-2xl shadow-slate-900/60 md:px-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="success" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wide">
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-display leading-tight text-white sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">{t('hero.subtitle')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/projects" className="flex items-center gap-2">
                  {t('hero.primaryCta')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  {t('hero.secondaryCta')}
                  <Star className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="grid gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-white/5 border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm text-slate-300">{stat.label}</CardTitle>
                    <Zap className="h-4 w-4 text-emerald-300" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-display text-white">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{t('projects.title')}</p>
            <h2 className="text-3xl font-display text-white">{t('projects.subtitle')}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="flex h-full flex-col bg-slate-900/60">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                    <p className="text-sm text-slate-400">{project.description}</p>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-3 text-sm text-slate-300">
                    <p>{project.metrics}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="default" className="bg-white/10 text-white">
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
              <Link to="/projects" className="flex items-center gap-2 text-slate-200">
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
