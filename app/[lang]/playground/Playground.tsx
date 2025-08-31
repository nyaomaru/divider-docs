'use client';

import {
  divider,
  dividerLoop,
  dividerFirst,
  dividerLast,
  dividerNumberString,
  csvDivider,
  emailDivider,
  pathDivider,
  type DividerOptions,
} from '@nyaomaru/divider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { Breadcrumbs } from '@/ui/components/breadcrumbs';
import { Select } from '@/ui/components/select';
import { CheckboxWithLabel } from '@/ui/components/checkbox-with-label';
import { LabeledNumberInput } from '@/ui/components/labeled-number-input';
import { LabeledInput } from '@/ui/components/labeled-input';
import type { PlaygroundDictionary } from '@/types/dictionaries';

const STRING = 'string';
const ARRAY = 'array';

const DIVIDER = {
  DIVIDER: 'divider',
  DIVIDER_LOOP: 'dividerLoop',
  DIVIDER_FIRST: 'dividerFirst',
  DIVIDER_LAST: 'dividerLast',
  DIVIDER_NUMBER_STRING: 'dividerNumberString',
  CSV_DIVIDER: 'csvDivider',
  EMAIL_DIVIDER: 'emailDivider',
  PATH_DIVIDER: 'pathDivider',
} as const;

const FUNCTIONS = [
  DIVIDER.DIVIDER,
  DIVIDER.DIVIDER_LOOP,
  DIVIDER.DIVIDER_FIRST,
  DIVIDER.DIVIDER_LAST,
  DIVIDER.DIVIDER_NUMBER_STRING,
  DIVIDER.CSV_DIVIDER,
  DIVIDER.EMAIL_DIVIDER,
  DIVIDER.PATH_DIVIDER,
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

  const [csvDelimiter, setCsvDelimiter] = useState<string>(',');
  const [csvQuote, setCsvQuote] = useState<string>('"');
  const [emailSplitTLD, setEmailSplitTLD] = useState<boolean>(false);
  const [pathCollapse, setPathCollapse] = useState<boolean>(true);

  const isPreset =
    functionType === DIVIDER.CSV_DIVIDER ||
    functionType === DIVIDER.EMAIL_DIVIDER ||
    functionType === DIVIDER.PATH_DIVIDER;

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
          case DIVIDER.CSV_DIVIDER:
            return csvDivider(String(input), {
              delimiter: csvDelimiter || ',',
              quoteChar: csvQuote || '"',
              trim: options.trim,
            });
          case DIVIDER.EMAIL_DIVIDER:
            return emailDivider(String(input), {
              trim: options.trim,
              splitTLD: emailSplitTLD,
            });
          case DIVIDER.PATH_DIVIDER:
            return pathDivider(String(input), {
              trim: options.trim,
              collapse: pathCollapse,
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

      {!isPreset ? (
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
              className='w-full h-8 p-2 rounded border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white'
              placeholder={dict.playground.string.placeholder}
            />
          </TabsContent>

          <TabsContent value={ARRAY}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='w-full h-24 p-2 rounded border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white'
              placeholder={dict.playground.array.placeholder}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium'>Input</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full h-8 p-2 rounded border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white'
            placeholder={
              functionType === DIVIDER.CSV_DIVIDER
                ? '"a, ""quoted""",b'
                : functionType === DIVIDER.EMAIL_DIVIDER
                ? 'user@example.com'
                : '/usr/local/bin'
            }
          />
        </div>
      )}

      {!isPreset &&
      (functionType === DIVIDER.DIVIDER ||
        functionType === DIVIDER.DIVIDER_FIRST ||
        functionType === DIVIDER.DIVIDER_LAST) ? (
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2'>
            {dict.playground.separator.description}
          </label>
          <textarea
            value={separators}
            onChange={(e) => setSeparators(e.target.value)}
            className='w-full h-16 p-2 rounded border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white'
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
            <CheckboxWithLabel
              key={key}
              id={`${key}-option`}
              label={key}
              checked={options[key]}
              onChange={(checked) =>
                setOptions((prev) => ({ ...prev, [key]: checked }))
              }
            />
          );
        })}
        {!isPreset && (
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
        )}

        {functionType === DIVIDER.CSV_DIVIDER && (
          <div className='flex items-center gap-4 flex-wrap'>
            <LabeledInput
              label='delimiter'
              value={csvDelimiter}
              onChange={setCsvDelimiter}
            />
            <LabeledInput
              label='quoteChar'
              value={csvQuote}
              onChange={setCsvQuote}
            />
          </div>
        )}

        {functionType === DIVIDER.EMAIL_DIVIDER && (
          <CheckboxWithLabel
            label='splitTLD'
            checked={emailSplitTLD}
            onChange={setEmailSplitTLD}
          />
        )}

        {functionType === DIVIDER.PATH_DIVIDER && (
          <CheckboxWithLabel
            label='collapse'
            checked={pathCollapse}
            onChange={setPathCollapse}
          />
        )}
      </section>

      {output !== null && (
        <div className='p-4 border rounded bg-zinc-100 text-zinc-900 whitespace-pre-wrap break-words mb-6 dark:bg-zinc-800 dark:text-white border-zinc-200 dark:border-zinc-800'>
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
