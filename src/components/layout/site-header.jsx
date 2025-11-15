import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="text-lg font-display tracking-tight text-white">
          my<span className="text-emerald-400">.portfolio</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-slate-300 transition hover:text-white',
                  isActive && 'text-white font-semibold'
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
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
        <div className="md:hidden border-t border-white/5 bg-slate-950/90 backdrop-blur px-4 pb-6">
          <div className="flex flex-col gap-4 pt-4 text-base">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.href}
                className={({ isActive }) =>
                  cn('text-slate-200', isActive && 'text-white font-semibold')
                }
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <LanguageToggle orientation="vertical" />
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
