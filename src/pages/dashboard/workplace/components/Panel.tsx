import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// One shell for every block on the workplace page, so headers, borders and spacing read as a single system
export const Panel: FC<{ title: ReactNode; subtitle?: ReactNode; className?: string; children: ReactNode }> = ({
  title,
  subtitle,
  className,
  children,
}) => (
  <section className={cn('rounded-xl border border-border/60 bg-card shadow-xs overflow-hidden', className)}>
    <header className="px-4 sm:px-5 py-3.5 border-b border-border/50">
      <h2 className="text-sm font-semibold text-foreground tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </header>
    {children}
  </section>
);

export default Panel;
