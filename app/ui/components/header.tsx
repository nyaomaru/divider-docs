import { LogoLink } from '@/ui/components/logo-link';
import { Button } from '@/ui/components/button';
import { Github, Download } from 'lucide-react';

export function Header() {
  return (
    <header className='sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <LogoLink />
          <span className='text-xl font-bold'>@nyaomaru/divider</span>
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' asChild>
            <a
              href='https://www.npmjs.com/package/@nyaomaru/divider'
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
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='mr-2 h-4 w-4' />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
