import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none gap-2',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl hover:shadow-primary-500/20',
        secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg hover:shadow-xl hover:shadow-secondary-500/20',
        neon: 'bg-neutral-900 text-primary-400 border border-primary-500/50 shadow-neon hover:shadow-neon-strong hover:border-primary-400',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:text-white',
        ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
        glass: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20',
        minimal: 'text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400',
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