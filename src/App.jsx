import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from '@/pages/Home';
import HomePage2 from '@/pages/Home2';
import AboutPage from '@/pages/About';
import AboutPage2 from '@/pages/About2';
import ProjectsPage from '@/pages/Projects';
import ExperiencePage from '@/pages/Experience';
import ContactPage from '@/pages/Contact';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const locale = i18n.language || 'en';
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = locale;
    document.body.style.fontFamily = locale.startsWith('ar') ? '"Cairo", system-ui, sans-serif' : '';
  }, [i18n]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-zinc-950 dark:text-white">
      <SiteHeader />
      <main className="flex-1 px-2 md:px-10 py-12 md:py-16">
        <Routes>
          <Route path="/" element={<HomePage2 />} />
          <Route path="/about" element={<AboutPage2 />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
