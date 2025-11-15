import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Dribbble } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { icon: Dribbble, label: 'Dribbble', href: 'https://dribbble.com/' },
];

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/60">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl text-white">my.portfolio</p>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} · {t('hero.subtitle')}</p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:gap-8">
          <NavLink to="/projects" className="hover:text-white">
            {t('nav.projects')}
          </NavLink>
          <NavLink to="/experience" className="hover:text-white">
            {t('nav.experience')}
          </NavLink>
          <NavLink to="/contact" className="hover:text-white">
            {t('nav.contact')}
          </NavLink>
        </div>
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
