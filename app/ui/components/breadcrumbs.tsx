import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type {
  BreadcrumbPath,
  BreadcrumbsProps,
} from '@/types/ui/components/breadcrumbs';

export function Breadcrumbs({ paths }: BreadcrumbsProps) {
  const isFirstPath = (index: number) => index === 0;
  const isNavigable = (path: BreadcrumbPath) => path.href !== undefined;

  return (
    <nav className='text-sm text-zinc-400 mb-6 flex items-center gap-1'>
      {paths.map((path, index) => (
        <span
          key={`${path.label}-${index}`}
          className='flex items-center gap-1'
        >
          {!isFirstPath(index) && <ChevronRight className='w-4 h-4' />}
          {isNavigable(path) ? (
            <Link
              href={path.href}
              className='text-zinc-900 hover:underline dark:text-white'
            >
              {path.label}
            </Link>
          ) : (
            <span className='text-zinc-400'>{path.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
