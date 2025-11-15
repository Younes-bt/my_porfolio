import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ModeToggle({ size = 'icon', className }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((theme ?? 'dark') === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      className={cn(
        'relative rounded-full border border-slate-900/10 text-slate-900 transition dark:border-white/10 dark:text-white',
        size === 'icon'
          ? 'h-10 w-10 hover:border-slate-900/30 dark:hover:border-white/30'
          : 'hover:border-slate-900/40 dark:hover:border-white/40',
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle color mode"
      disabled={!mounted}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
