'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { Breadcrumbs } from '@/ui/components/breadcrumbs';
import {
  divider,
  dividerLoop,
  dividerFirst,
  dividerLast,
  dividerNumberString,
} from '@nyaomaru/divider';
import type { PlaygroundDictionary } from '@/types/dictionaries';

const STRING = 'string';
const ARRAY = 'array';

const FUNCTIONS = [
  'divider',
  'dividerLoop',
  'dividerFirst',
  'dividerLast',
  'dividerNumberString',
] as const;

type PlaygroundInputType = typeof STRING | typeof ARRAY;
type DividerFunctionType = (typeof FUNCTIONS)[number];

type PlaygroundPageProps = {
  dict: {
    playground: PlaygroundDictionary['playground'];
  };
};

export default function PlaygroundPage({ dict }: PlaygroundPageProps) {
  const [functionType, setFunctionType] =
    useState<DividerFunctionType>('divider');
  const [inputType, setInputType] = useState<PlaygroundInputType>(STRING);
  const [input, setInput] = useState<string>('');
  const [separators, setSeparators] = useState<string>('');
  const [options, setOptions] = useState({
    flatten: false,
    trim: false,
    excludeEmpty: false,
  });
  const [size, setSize] = useState<number>(2);
  const [startOffset, setStartOffset] = useState<number>(0);
  const [output, setOutput] = useState<unknown>(null);
  const router = useRouter();

  const isStringInput = inputType === STRING;

  const getParsedInput = (): string | string[] =>
    isStringInput ? input : input.split(/\r?\n/).filter(Boolean);

  const getParsedSeparators = (): (string | number)[] =>
    separators
      .split('\n')
      .filter((s) => s !== '')
      .map((s) => {
        const num = Number(s);
        return String(num) === s ? num : s;
      });

  const getParsedOptions = () =>
    isStringInput
      ? { trim: options.trim, excludeEmpty: options.excludeEmpty }
      : options;

  const handleRun = () => {
    try {
      const inputData = getParsedInput();
      const separatorData = getParsedSeparators();
      const option = getParsedOptions();

      const result = () => {
        switch (functionType) {
          case 'divider':
            return divider(inputData, ...separatorData, option);
          case 'dividerFirst':
            return dividerFirst(inputData, ...separatorData);
          case 'dividerLast':
            return dividerLast(inputData, ...separatorData);
          case 'dividerNumberString':
            return dividerNumberString(inputData, option);
          case 'dividerLoop':
            return dividerLoop(inputData, size, {
              ...option,
              startOffset,
            });
        }
      };

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

      <h1 className='text-2xl font-bold mb-6'>{dict.playground.title}</h1>
      <p className='text-xl text-zinc-400 mb-8'>
        {dict.playground.description}
      </p>

      <div className='mb-4'>
        <label className='block mb-1 text-sm font-medium'>Function</label>
        <select
          value={functionType}
          onChange={(e) =>
            setFunctionType(e.target.value as DividerFunctionType)
          }
          className='rounded border px-2 py-1 bg-zinc-900 text-white'
        >
          {FUNCTIONS.map((fn) => (
            <option key={fn} value={fn}>
              {fn}
            </option>
          ))}
        </select>
      </div>

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
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full h-8 p-2 rounded border bg-zinc-900 text-white'
            placeholder={dict.playground.string.placeholder}
          />
        </TabsContent>

        <TabsContent value={ARRAY}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full h-24 p-2 rounded border bg-zinc-900 text-white'
            placeholder={dict.playground.array.placeholder}
          />
        </TabsContent>
      </Tabs>

      {functionType === 'divider' ||
      functionType === 'dividerFirst' ||
      functionType === 'dividerLast' ? (
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2'>
            {dict.playground.separator.description}
          </label>
          <textarea
            value={separators}
            onChange={(e) => setSeparators(e.target.value)}
            className='w-full h-16 p-2 rounded border bg-zinc-900 text-white'
          />
        </div>
      ) : null}

      {functionType === 'dividerLoop' && (
        <div className='flex gap-4 mb-6'>
          <label>
            Chunk Size
            <input
              type='number'
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className='ml-2 w-20 p-1 rounded border bg-zinc-900 text-white'
            />
          </label>
          <label>
            Start Offset
            <input
              type='number'
              value={startOffset}
              onChange={(e) => setStartOffset(Number(e.target.value))}
              className='ml-2 w-20 p-1 rounded border bg-zinc-900 text-white'
            />
          </label>
        </div>
      )}

      <section className='flex items-center gap-4 mb-6'>
        <Button variant='outline' onClick={handleRun}>
          {dict.playground.button.run}
        </Button>

        {(['flatten', 'trim', 'excludeEmpty'] as const).map((key) => {
          if (key === 'flatten' && isStringInput) return null;

          return (
            <label
              key={key}
              htmlFor={`${key}-option`}
              className='flex items-center gap-2'
            >
              <input
                id={`${key}-option`}
                type='checkbox'
                checked={options[key]}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                }
                className='accent-white'
              />
              {key}
            </label>
          );
        })}
      </section>

      {output !== null && (
        <div className='p-4 border rounded bg-zinc-800 text-white whitespace-pre-wrap break-words mb-6'>
          <strong> {dict.playground.output.title}:</strong>
          <pre className='mt-2'>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}

      <Button variant='outline' onClick={() => router.back()}>
        {dict.playground.button.back}
      </Button>
    </main>
  );
}
