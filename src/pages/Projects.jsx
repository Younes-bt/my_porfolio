import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true });

  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">{t('projects.title')}</p>
        <h1 className="text-4xl font-display text-white">{t('projects.subtitle')}</h1>
        <p className="text-base text-slate-400">{t('hero.subtitle')}</p>
      </div>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <Card className="border-white/10 bg-slate-900/60">
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-slate-300">{project.description}</CardDescription>
                </div>
                <Badge variant="success" className="w-fit">
                  {project.metrics}
                </Badge>
              </CardHeader>
              <CardContent className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="w-full md:w-auto" asChild>
                  <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    {t('projects.actionLabel')}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
