import { LogoLink } from '@/ui/components/logo-link';

export function Footer() {
  return (
    <footer className='border-t border-zinc-200 py-8 dark:border-zinc-800'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='flex items-center gap-2 mb-4 md:mb-0'>
          <LogoLink />
          <span className='font-medium relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 hover:before:w-full'>
            @nyaomaru/divider
          </span>
        </div>
        <div className='text-sm text-zinc-400'>
          Made with 💚 by{' '}
          <a
            href='https://github.com/nyaomaru'
            className='underline hover:text-zinc-900 dark:hover:text-white'
          >
            nyaomaru
          </a>
        </div>
      </div>
    </footer>
  );
}
