import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof import('@/ui/components/button').buttonVariants> {
  asChild?: boolean;
}
