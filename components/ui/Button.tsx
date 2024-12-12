'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none gap-2',
  {
    variants: {
      variant: {
        default: 'bg-gradient-cosmic text-cream-50 hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-cosmic-500/20',
        secondary: 'bg-cream-200 text-cosmic-900 hover:bg-cream-300 shadow-lg hover:shadow-xl hover:shadow-cosmic-500/20',
        neon: 'bg-cosmic-900 text-cosmic-400 border border-cosmic-500/50 shadow-neon hover:shadow-neon-strong hover:border-cosmic-400',
        outline: 'border-2 border-cosmic-500 text-cosmic-500 hover:bg-cosmic-500 hover:text-cream-50',
        ghost: 'text-cosmic-700 hover:bg-cosmic-100',
        glass: 'bg-cream-50/10 backdrop-blur-lg border border-cream-50/20 text-cream-50 hover:bg-cream-50/20',
        minimal: 'text-cosmic-600 hover:text-cosmic-500',
      },
      size: {
        default: 'h-11 px-6 py-2 rounded-lg',
        sm: 'h-9 px-4 py-2 rounded-md text-sm',
        lg: 'h-12 px-8 py-3 rounded-lg text-base',
        xl: 'h-14 px-10 py-4 rounded-xl text-lg',
        icon: 'h-11 w-11 rounded-lg',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        glow: 'animate-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };