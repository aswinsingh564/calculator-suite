import { formatDisplay } from '@/lib/calculator';
import { cn } from '@/lib/utils';

interface DisplayProps {
  value: string;
  expression: string;
  hasResult: boolean;
  resultKey: number;
}

export function Display({ value, expression, hasResult, resultKey }: DisplayProps) {
  const formattedValue = formatDisplay(value);
  
  // Determine font size based on length
  const getFontSize = () => {
    const len = formattedValue.length;
    if (len <= 8) return 'text-5xl sm:text-6xl md:text-7xl';
    if (len <= 12) return 'text-4xl sm:text-5xl md:text-6xl';
    if (len <= 16) return 'text-3xl sm:text-4xl md:text-5xl';
    return 'text-2xl sm:text-3xl md:text-4xl';
  };

  return (
    <div className="calc-display rounded-2xl p-4 sm:p-6 mb-4">
      {/* Expression */}
      <div className="h-8 mb-2 overflow-hidden">
        <p className="text-right text-sm sm:text-base text-muted-foreground font-mono truncate">
          {expression || '\u00A0'}
        </p>
      </div>
      
      {/* Main result */}
      <div className="min-h-[4rem] flex items-end justify-end overflow-hidden">
        <p
          key={resultKey}
          className={cn(
            'font-mono font-semibold text-right transition-all duration-200',
            getFontSize(),
            hasResult && 'animate-result-flip',
            value === 'Error' && 'text-destructive'
          )}
        >
          {formattedValue}
        </p>
      </div>
    </div>
  );
}
