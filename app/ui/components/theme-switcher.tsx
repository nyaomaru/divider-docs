'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/ui/components/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <Button
        variant='outline'
        size='sm'
        className='border-1'
        aria-label='Toggle theme'
      >
        <Sun className='h-4 w-4' />
      </Button>
    );
  }

  return (
    <Button
      variant='outline'
      size='sm'
      className='border-1'
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? (
        <Sun className='h-4 w-4' />
      ) : (
        <Moon className='h-4 w-4' />
      )}
    </Button>
  );
}

