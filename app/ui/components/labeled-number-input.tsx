'use client';

import * as Label from '@radix-ui/react-label';
import { clsx } from 'clsx';

type LabeledNumberInputProps = {
  id: string;
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  widthClass?: string;
};

export function LabeledNumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  widthClass = 'w-20',
}: LabeledNumberInputProps) {
  return (
    <div className='flex flex-col gap-1 text-sm'>
      <Label.Root htmlFor={id} className='font-medium'>
        {label}
      </Label.Root>
      <input
        id={id}
        type='number'
        value={value ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === '' ? undefined : Number(val));
        }}
        placeholder={placeholder}
        className={clsx(
          widthClass,
          'p-1 rounded border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:ring-white'
        )}
      />
    </div>
  );
}
