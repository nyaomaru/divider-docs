'use client';

import {
  divider,
  dividerLoop,
  dividerFirst,
  dividerLast,
  dividerNumberString,
  type DividerOptions,
} from '@nyaomaru/divider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { Breadcrumbs } from '@/ui/components/breadcrumbs';
import type { PlaygroundDictionary } from '@/types/dictionaries';
import { Select } from '@/ui/components/select';
import { LabeledNumberInput } from '@/ui/components/labeled-number-input';

const STRING = 'string';
const ARRAY = 'array';

const DIVIDER = {
  DIVIDER: 'divider',
  DIVIDER_LOOP: 'dividerLoop',
  DIVIDER_FIRST: 'dividerFirst',
  DIVIDER_LAST: 'dividerLast',
  DIVIDER_NUMBER_STRING: 'dividerNumberString',
} as const;

const FUNCTIONS = [
  DIVIDER.DIVIDER,
  DIVIDER.DIVIDER_LOOP,
  DIVIDER.DIVIDER_FIRST,
  DIVIDER.DIVIDER_LAST,
  DIVIDER.DIVIDER_NUMBER_STRING,
] as const;

const OPTIONS = {
  FLATTEN: 'flatten',
  TRIM: 'trim',
  EXCLUDE: 'none',
} as const;
const EXCLUDE_OPTION = {
  NONE: 'none',
  EMPTY: 'empty',
  WHITESPACE: 'whitespace',
} as const;

type PlaygroundInputType = typeof STRING | typeof ARRAY;
type DividerFunctionType = (typeof FUNCTIONS)[number];

type PlaygroundPageProps = {
  dict: {
    playground: PlaygroundDictionary['playground'];
  };
};

export default function PlaygroundPage({ dict }: PlaygroundPageProps) {
  const [functionType, setFunctionType] = useState<DividerFunctionType>(
    DIVIDER.DIVIDER
  );
  const [inputType, setInputType] = useState<PlaygroundInputType>(STRING);
  const [input, setInput] = useState<string>('');
  const [separators, setSeparators] = useState<string>('');
  const [options, setOptions] = useState<DividerOptions>({
    flatten: false,
    trim: false,
    exclude: EXCLUDE_OPTION.NONE,
  });
  const [size, setSize] = useState<number>(2);
  const [startOffset, setStartOffset] = useState<number>(0);
  const [maxChunks, setMaxChunks] = useState<number | undefined>(undefined);
  const [output, setOutput] = useState<unknown>(null);
  const router = useRouter();

  const isStringInput = inputType === STRING;

  const getParsedInput = (): string | string[] =>
    isStringInput ? input : input.split(/\r?\n/).filter(Boolean);

  const getParsedSeparators = (): (string | number)[] =>
    separators
      .split('\n')
      .filter((separator) => separator !== '')
      .map((separator) => {
        const num = Number(separator);
        return String(num) === separator ? num : separator;
      });

  const getParsedOptions = () =>
    isStringInput ? { trim: options.trim, exclude: options.exclude } : options;

  const handleRun = () => {
    try {
      const inputData = getParsedInput();
      const separatorData = getParsedSeparators();
      const option = getParsedOptions();

      const result = () => {
        switch (functionType) {
          case DIVIDER.DIVIDER:
            return divider(inputData, ...separatorData, option);
          case DIVIDER.DIVIDER_FIRST:
            return dividerFirst(inputData, ...separatorData);
          case DIVIDER.DIVIDER_LAST:
            return dividerLast(inputData, ...separatorData);
          case DIVIDER.DIVIDER_NUMBER_STRING:
            return dividerNumberString(inputData, option);
          case DIVIDER.DIVIDER_LOOP:
            return dividerLoop(inputData, size, {
              ...option,
              startOffset,
              maxChunks,
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
        <label className='block mb-2 text-sm font-medium'>Function</label>
        <Select
          value={functionType}
          onValueChange={(val) => setFunctionType(val as DividerFunctionType)}
          options={FUNCTIONS}
        />
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

      {functionType === DIVIDER.DIVIDER ||
      functionType === DIVIDER.DIVIDER_FIRST ||
      functionType === DIVIDER.DIVIDER_LAST ? (
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

      {functionType === DIVIDER.DIVIDER_LOOP && (
        <div className='flex gap-4 mb-6'>
          <LabeledNumberInput
            id='chunk-size'
            label='Chunk Size'
            value={size}
            onChange={(val: number | undefined) => setSize(val ?? 0)}
          />
          <LabeledNumberInput
            id='start-offset'
            label='Start Offset'
            value={startOffset}
            onChange={(val: number | undefined) => setStartOffset(val ?? 0)}
          />
          <LabeledNumberInput
            id='max-chunks'
            label='Max Chunks'
            value={maxChunks}
            onChange={setMaxChunks}
            placeholder='e.g. 3'
            widthClass='w-24'
          />
        </div>
      )}

      <section className='flex items-center gap-4 mb-6'>
        <Button variant='outline' onClick={handleRun}>
          {dict.playground.button.run}
        </Button>

        {([OPTIONS.FLATTEN, OPTIONS.TRIM] as const).map((key) => {
          if (key === OPTIONS.FLATTEN && isStringInput) return null;

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
        <div className='flex flex-col gap-2'>
          <Select
            value={options.exclude}
            onValueChange={(val) =>
              setOptions((prev) => ({ ...prev, exclude: val }))
            }
            options={
              [
                EXCLUDE_OPTION.NONE,
                EXCLUDE_OPTION.EMPTY,
                EXCLUDE_OPTION.WHITESPACE,
              ] as const
            }
          />
        </div>
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
