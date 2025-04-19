import type { CardProps } from '@/types/ui/components/card';

export function Card({ id, children }: CardProps) {
  return (
    <div
      id={id}
      className='block max-w-sm p-6 border rounded-lg shadow-sm bg-zinc-900 border-zinc-800'
    >
      {children}
    </div>
  );
}
