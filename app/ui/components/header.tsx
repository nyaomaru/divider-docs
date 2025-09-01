'use client';

import { Github, Download, Rocket } from 'lucide-react';

import { usePathname } from 'next/navigation';

import { LogoLink } from '@/ui/components/logo-link';
import { Button } from '@/ui/components/button';
import { LanguageSwitcher } from '@/ui/components/language-switcher';

export function Header() {
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'en';

  return (
    <header className='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <LogoLink />
          <span className='relative font-bold text-xl before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 hover:before:w-full'>
            @nyaomaru/divider
          </span>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' asChild>
            <a
              href={`/${currentLang}/playground`}
              aria-label='Go to playground page'
            >
              <Rocket className='mr-2 h-4 w-4' />
              playground
            </a>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href='https://www.npmjs.com/package/@nyaomaru/divider'
              aria-label='Go to npm registry'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Download className='mr-2 h-4 w-4' />
              npm
            </a>
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href='https://github.com/nyaomaru/divider'
              aria-label='Go to GitHub repository'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='mr-2 h-4 w-4' />
              GitHub
            </a>
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
