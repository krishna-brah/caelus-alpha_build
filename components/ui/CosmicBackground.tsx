import React from 'react';
import { cn } from '../../lib/utils/cn';

interface CosmicBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'wave' | 'stars';
  overlay?: boolean;
}

export const CosmicBackground = React.forwardRef<HTMLDivElement, CosmicBackgroundProps>(
  ({ className, variant = 'default', overlay = true, ...props }, ref) => {
    const variants = {
      default: 'bg-gradient-cosmic',
      wave: 'bg-cream-50',
      stars: 'bg-cosmic-900',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full',
          variants[variant],
          className
        )}
        {...props}
      >
        {variant === 'wave' && (
          <div className="absolute inset-0 bg-[url('/patterns/wave.svg')] bg-repeat-x opacity-10" />
        )}
        {variant === 'stars' && (
          <div className="absolute inset-0 bg-[url('/patterns/stars.svg')] bg-repeat opacity-20" />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-900/10 to-cosmic-900/30" />
        )}
        <div className="relative z-10">{props.children}</div>
      </div>
    );
  }
);

CosmicBackground.displayName = 'CosmicBackground';