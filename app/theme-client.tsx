'use client';

import type { ReactNode } from 'react';
import { useTheme } from '@/lib/use-theme';

export default function ThemeClient({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <body className={theme === 'dark' ? 'dark' : undefined}>
      {children}
    </body>
  );
}

