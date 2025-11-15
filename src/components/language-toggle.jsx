import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const supportedLocales = ['en', 'fr'];

export function LanguageToggle({ orientation = 'horizontal' }) {
  const { i18n, t } = useTranslation();
  const active = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div className={cn('flex items-center gap-2', orientation === 'vertical' && 'flex-col items-stretch')}>
      <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-slate-400">
        <Globe className="h-4 w-4" />
        <span>{t(`languages.${active}`)}</span>
      </div>
      <div className={cn('flex gap-2', orientation === 'vertical' && 'flex-col')}>
        {supportedLocales.map((locale) => (
          <Button
            key={locale}
            variant={active === locale ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => i18n.changeLanguage(locale)}
          >
            {t(`languages.${locale}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
