'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { divider } from '@nyaomaru/divider';

type PlaygroundInputType = 'string' | 'array';

export default function PlaygroundPage() {
  const [inputType, setInputType] = useState<PlaygroundInputType>('string');
  const [input, setInput] = useState<string>('');
  const [separators, setSeparators] = useState<string>('');
  const [flatten, setFlatten] = useState<boolean>(false);
  const [output, setOutput] = useState<unknown>(null);
  const isStringInput = inputType === 'string';
  const isStringArrayInput = inputType === 'array';

  const runDivider = () => {
    const inputValue = isStringInput ? input : input.split(/\r?\n/);
    const separatorTokens = separators
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (isNaN(Number(s)) ? s : Number(s)));

    try {
      const result = divider(inputValue, ...separatorTokens, { flatten });
      setOutput(result);
    } catch (e) {
      setOutput(`Error: ${(e as Error).message}`);
    }
  };

  return (
    <main className='container mx-auto px-4 py-12'>
      <h1 className='text-2xl font-bold mb-6'>Playground</h1>

      <Tabs
        defaultValue='string'
        onValueChange={(val: PlaygroundInputType) => setInputType(val)}
        className='mb-6'
      >
        <TabsList className='mb-4'>
          <TabsTrigger value='string'>string</TabsTrigger>
          <TabsTrigger value='array'>string[]</TabsTrigger>
        </TabsList>
        <TabsContent value='string'>
          <div className='ml-1'>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='w-full h-24 p-2 rounded border bg-zinc-900 text-white'
              placeholder='Enter string...'
            />
          </div>
        </TabsContent>
        <TabsContent value='array'>
          <div className='ml-1'>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='w-full h-24 p-2 rounded border bg-zinc-900 text-white'
              placeholder='Enter strings, one per line...'
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className='ml-1 mb-6'>
        <label className='block text-sm font-medium mb-2'>
          Separators (comma or newline separated)
        </label>
        <textarea
          value={separators}
          onChange={(e) => setSeparators(e.target.value)}
          className='w-full h-16 p-2 rounded border bg-zinc-900 text-white'
        />
      </div>

      <section className='flex items-center gap-4 mb-6'>
        <Button variant='outline' onClick={runDivider}>
          Run
        </Button>
        {isStringArrayInput && (
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={flatten}
              onChange={(e) => setFlatten(e.target.checked)}
              className='accent-white'
            />
            Flatten
          </label>
        )}
      </section>

      {output !== null && (
        <div className='p-4 border rounded bg-zinc-800 text-white whitespace-pre-wrap break-words'>
          <strong>Output:</strong>
          <pre className='mt-2'>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
