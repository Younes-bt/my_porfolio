import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const languageOptions = [
  { code: 'en', flag: '🇬🇧' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'ar', flag: '🇲🇦' },
];

export function LanguageToggle({ orientation = 'horizontal' }) {
  const { i18n, t } = useTranslation();
  const active = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0];
  const currentOption = languageOptions.find((opt) => opt.code === active) ?? languageOptions[0];

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className={cn('min-w-[140px]', orientation === 'vertical' && 'w-full')}>
      <Select value={active} onValueChange={handleChange}>
        <SelectTrigger className={cn('h-10 w-full justify-between px-4', orientation === 'vertical' && 'w-full')}>
          <span className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
            <span className="text-base leading-none">{currentOption.flag}</span>
            {t(`languages.${active}`)}
          </span>
        </SelectTrigger>
        <SelectContent align="end" className="min-w-[180px]">
          {languageOptions.map((option) => (
            <SelectItem key={option.code} value={option.code} className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-sm">
                <span className="text-base leading-none">{option.flag}</span>
                {t(`languages.${option.code}`)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
