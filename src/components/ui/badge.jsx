import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default:
          'border-slate-900/20 bg-slate-900/5 text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white',
        success:
          'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
));
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
