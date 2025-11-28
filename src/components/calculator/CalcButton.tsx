import { useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'number' | 'operator' | 'function' | 'equals';

interface CalcButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  span?: 1 | 2;
  className?: string;
  ariaLabel?: string;
}

export function CalcButton({
  children,
  onClick,
  variant = 'number',
  span = 1,
  className,
  ariaLabel,
}: CalcButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(() => {
    setIsPressed(true);
    
    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    onClick();
    
    setTimeout(() => setIsPressed(false), 150);
  }, [onClick]);

  const variantClasses: Record<ButtonVariant, string> = {
    number: 'calc-button text-foreground hover:bg-calc-button-hover',
    operator: 'calc-button calc-button-operator',
    function: 'calc-button calc-button-function',
    equals: 'calc-button calc-button-equals animate-glow-pulse',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel || String(children)}
      className={cn(
        'h-16 sm:h-18 md:h-20 flex items-center justify-center text-xl sm:text-2xl font-medium',
        'select-none touch-manipulation',
        variantClasses[variant],
        span === 2 && 'col-span-2',
        isPressed && 'animate-press',
        className
      )}
    >
      {children}
    </button>
  );
}
