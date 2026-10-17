import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'pill' | 'button' | 'minimal';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className,
  variant = 'pill',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'pill') {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-full border border-border/80 bg-background/80 p-0.5 shadow-2xs backdrop-blur-md transition-colors',
          className,
        )}
      >
        <button
          type="button"
          onClick={() => setLanguage('vi')}
          className={cn(
            'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer',
            language === 'vi'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-label="Tiếng Việt"
        >
          <span>VI</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={cn(
            'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer',
            language === 'en'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-label="English"
        >
          <span>EN</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer shadow-2xs',
        className,
      )}
      title={language === 'vi' ? 'Chuyển sang English' : 'Switch to Tiếng Việt'}
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5 text-primary" />
      <span className="uppercase">{language === 'vi' ? 'EN' : 'VI'}</span>
    </button>
  );
};

export default LanguageToggle;
