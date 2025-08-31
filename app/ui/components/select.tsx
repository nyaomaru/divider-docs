'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

type SelectProps<T extends string> = {
  value: T;
  onValueChange: (value: T) => void;
  options: readonly T[];
  className?: string;
};

export function Select<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: SelectProps<T>) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={clsx(
          'w-1xl inline-flex items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-1 hover:text-primary hover:border-primary cursor-pointer dark:border-white dark:bg-zinc-900 dark:text-white',
          className
        )}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon>
          <ChevronDown className='h-4 w-4 opacity-50' />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          side='bottom'
          className='z-50 mt-1 w-full rounded-md bg-white text-zinc-900 shadow-md dark:bg-zinc-900 dark:text-white'
        >
          <RadixSelect.Viewport className='p-1'>
            {options.map((option) => (
              <RadixSelect.Item
                key={option}
                value={option}
                className='flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 outline-none hover:bg-zinc-100 focus:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800 dark:focus:bg-zinc-800'
              >
                <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className='ml-auto'>
                  <Check className='h-4 w-4' />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
