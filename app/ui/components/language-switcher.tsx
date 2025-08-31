'use client';

import clsx from 'clsx';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';

import { Button } from '@/ui/components/button';
import { locales } from '@/constants/locales';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const localePattern = useMemo(() => {
    return new RegExp(`^/(${locales.map((l) => l.code).join('|')})(/|$)`);
  }, []);

  const changeLanguage = (locale: string) => {
    const match = pathname.match(localePattern);
    const withoutLocale = match ? pathname.replace(match[0], '') : pathname;
    const newPath = `/${locale}/${withoutLocale}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='data-[state=open]:border-1 data-[state=closed]:border-1 data-[state=open]:text-primary'
          aria-label='Language'
        >
          <Globe className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='z-10 bg-white text-zinc-900 dark:bg-black dark:text-white'
      >
        {locales.map(({ code, label, flag }) => (
          <DropdownMenuItem
            className={clsx(
              'cursor-pointer flex m-2 bg-white text-zinc-900 dark:bg-black dark:text-white',
              code === currentLocale ? 'text-primary' : ''
            )}
            key={code}
            onClick={() => changeLanguage(code)}
          >
            <Image
              src={flag}
              alt={label}
              width={20}
              height={15}
              className='mr-2'
            />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
