import type { ReactNode } from 'react';

export function Card({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div
      id={id}
      className='block max-w-sm p-6 border rounded-lg shadow-sm bg-zinc-900 border-zinc-800'
    >
      {children}
    </div>
  );
}
