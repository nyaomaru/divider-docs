'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { Breadcrumbs } from '@/ui/components/breadcrumbs';
import { divider } from '@nyaomaru/divider';

type PlaygroundInputType = 'string' | 'array';

const STRING = 'string';
const ARRAY = 'array';

export default function PlaygroundPage() {
  const [inputType, setInputType] = useState<PlaygroundInputType>('string');
  const [input, setInput] = useState<string>('');
  const [separators, setSeparators] = useState<string>('');
  const [flatten, setFlatten] = useState<boolean>(false);
  const [trim, setTrim] = useState<boolean>(false);
  const [output, setOutput] = useState<unknown>(null);
  const router = useRouter();

  const isStringInput = inputType === 'string';
  const isStringArrayInput = inputType === 'array';

  const getParsedInput = (): string | string[] =>
    isStringInput ? input : input.split(/\r?\n/).filter(Boolean);

  const getParsedSeparators = (): (string | number)[] =>
    separators
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => (isNaN(Number(s)) ? s : Number(s)));

  const handleRun = () => {
    try {
      const result = divider(getParsedInput(), ...getParsedSeparators(), {
        flatten,
        trim,
      });
      setOutput(result);
    } catch (e) {
      setOutput(`Error: ${(e as Error).message}`);
    }
  };

  return (
    <main className='container mx-auto px-4 py-12'>
      <Breadcrumbs
        paths={[{ label: 'Home', href: '/' }, { label: 'Playground' }]}
      />

      <h1 className='text-2xl font-bold mb-6'>Playground</h1>

      <Tabs
        defaultValue={STRING}
        onValueChange={(val: PlaygroundInputType) => setInputType(val)}
        className='mb-6'
      >
        <TabsList className='mb-4'>
          <TabsTrigger value={STRING}>string</TabsTrigger>
          <TabsTrigger value={ARRAY}>string[]</TabsTrigger>
        </TabsList>

        <TabsContent value={STRING}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full h-24 p-2 rounded border bg-zinc-900 text-white'
            placeholder='Enter string...'
          />
        </TabsContent>

        <TabsContent value={ARRAY}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full h-24 p-2 rounded border bg-zinc-900 text-white'
            placeholder='Enter strings, one per line...'
          />
        </TabsContent>
      </Tabs>

      <div className='mb-6'>
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
        <Button variant='outline' onClick={handleRun}>
          Run
        </Button>

        {isStringArrayInput && (
          <label htmlFor='flatten-option' className='flex items-center gap-2'>
            <input
              id='flatten-option'
              type='checkbox'
              checked={flatten}
              onChange={(e) => setFlatten(e.target.checked)}
              className='accent-white'
            />
            Flatten
          </label>
        )}
        <label htmlFor='trim-option' className='flex items-center gap-2'>
          <input
            id='trim-option'
            type='checkbox'
            checked={trim}
            onChange={(e) => setTrim(e.target.checked)}
            className='accent-white'
          />
          Trim
        </label>
      </section>

      {output !== null && (
        <div className='p-4 border rounded bg-zinc-800 text-white whitespace-pre-wrap break-words mb-6'>
          <strong>Output:</strong>
          <pre className='mt-2'>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}

      <Button variant='outline' onClick={() => router.back()}>
        ← Back
      </Button>
    </main>
  );
}
