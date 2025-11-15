import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/Home';
import ProjectsPage from '@/pages/Projects';
import ExperiencePage from '@/pages/Experience';
import ContactPage from '@/pages/Contact';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <main className="container flex-1 py-12 md:py-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
