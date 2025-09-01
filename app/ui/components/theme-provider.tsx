'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      {children}
    </NextThemeProvider>
  );
}
