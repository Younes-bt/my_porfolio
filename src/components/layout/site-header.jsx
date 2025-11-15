import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'experience', href: '/experience' },
  { key: 'contact', href: '/contact' },
];

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/80 backdrop-blur-xl transition-colors dark:border-white/5 dark:bg-slate-950/70">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img src="/logo2-final copy.svg" alt="my portfolio" className="h-9 dark:hidden" />
          <img src="/logo2-final white.svg" alt="" aria-hidden="true" className="hidden h-9 dark:block" />
          <span className="sr-only">Home</span>
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                  isActive && 'font-semibold text-slate-900 dark:text-white'
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <ModeToggle />
          <Button variant="secondary" size="sm" asChild>
            <NavLink to="/contact" className="flex items-center gap-2">
              {t('hero.secondaryCta')}
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open ? (
        <div className="border-t border-slate-900/10 bg-white/95 px-4 pb-6 shadow-lg backdrop-blur dark:border-white/5 dark:bg-slate-950/90 md:hidden">
          <div className="flex flex-col gap-4 pt-4 text-base">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-slate-700 dark:text-slate-200',
                    isActive && 'font-semibold text-slate-900 dark:text-white'
                  )
                }
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <LanguageToggle orientation="vertical" />
            <ModeToggle size="default" className="w-full justify-between" />
            <Button variant="secondary" className="w-full" asChild>
              <NavLink to="/contact" onClick={() => setOpen(false)}>
                {t('hero.secondaryCta')}
              </NavLink>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
