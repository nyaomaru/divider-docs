'use client';

import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';

import { Button } from '@/ui/components/button';
import clsx from 'clsx';

const locales = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'nl', label: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png' },
  { code: 'ja', label: '日本語', flag: 'https://flagcdn.com/w40/jp.png' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  const changeLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|nl|ja)/, '')}`;
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
      <DropdownMenuContent align='end' className='z-10 bg-black'>
        {locales.map(({ code, label, flag }) => (
          <DropdownMenuItem
            className={clsx(
              'cursor-pointer flex m-2 bg-black',
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
