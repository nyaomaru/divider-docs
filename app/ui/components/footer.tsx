import { LogoLink } from '@/ui/components/logo-link';

export function Footer() {
  return (
    <footer className='border-t border-zinc-800 py-8'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='flex items-center gap-2 mb-4 md:mb-0'>
          <LogoLink />
          <span className='font-medium'>@nyaomaru/divider</span>
        </div>
        <div className='text-sm text-zinc-400'>
          Made with 💚 by{' '}
          <a
            href='https://github.com/nyaomaru'
            className='underline hover:text-white'
          >
            nyaomaru
          </a>
        </div>
      </div>
    </footer>
  );
}
