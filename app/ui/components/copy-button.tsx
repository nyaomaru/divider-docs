'use client';

import { useState } from 'react';
import { Button } from '@/ui/components/button';

import { Copy, Check } from 'lucide-react';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={handleCopy}
      className='h-10 w-10 cursor-pointer'
    >
      {copied ? <Check className='h-8 w-8' /> : <Copy className='h-8 w-8' />}
      <span className='sr-only'>{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
}
