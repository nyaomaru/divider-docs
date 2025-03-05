import type { ReactNode } from 'react';

export function Card({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className='block max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-zinc-900 dark:border-zinc-800'
    >
      {children}
    </div>
  );
}
