'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { CopyButton } from '@/ui/components/copy-button';
import { FeatureCard } from '@/ui/components/feature-card';
import { CodeBlock } from '@/ui/components/code-block';
import { installTabs, installCode, usageTabs, usageCode } from '@/domain/docs';
import Image from 'next/image';

export default function DividerDocs() {
  return (
    <main className='container mx-auto px-4 py-12'>
      <section className='mb-16 flex flex-col items-center text-center'>
        <Image
          className='mb-6'
          src='/logo.svg'
          alt='divider logo'
          width={128}
          height={128}
        />
        <h1 id='divider-title' className='text-4xl font-bold mb-4'>
          Divide strings and arrays with ease
        </h1>
        <p className='text-xl text-zinc-400 max-w-2xl mb-8'>
          A lightweight utility library for dividing strings and arrays in
          multiple ways
        </p>
      </section>

      <section
        id='installation'
        aria-labelledby='installation-title'
        className='mb-16'
      >
        <h2 id='installation-title' className='text-3xl font-bold mb-6'>
          Installation
        </h2>

        <Tabs defaultValue='npm' className='mb-8'>
          <TabsList className='mb-4'>
            {installTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {installTabs.map((tab) => {
            const installCommand = installCode(tab);

            return (
              <TabsContent key={tab} value={tab} className='mb-8'>
                <div className='rounded-lg border border-zinc-800 bg-zinc-900'>
                  <div className='flex items-center justify-between px-4 py-2 border-b border-zinc-800'>
                    <h3>{tab}</h3>
                    <CopyButton
                      text={installCommand}
                      aria-label='Copy command'
                    />
                  </div>
                  <div className='p-4 overflow-x-auto text-sm'>
                    <CodeBlock code={installCommand} language='bash' />
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      <section id='usage' aria-labelledby='usage-title' className='mb-16'>
        <h2 id='usage-title' className='text-3xl font-bold mb-6'>
          Usage
        </h2>

        <Tabs defaultValue='basic' className='mb-8'>
          <TabsList className='mb-4'>
            {usageTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab} Examples
              </TabsTrigger>
            ))}
          </TabsList>

          {usageTabs.map((tab) => {
            const usageCommand = usageCode(tab);

            return (
              <TabsContent key={tab} value={tab} className='mb-8'>
                <div className='rounded-lg border border-zinc-800 bg-zinc-900'>
                  <div className='flex items-center justify-between px-4 py-2 border-b border-zinc-800'>
                    <h3>{tab}</h3>
                    <CopyButton text={usageCommand} aria-label='Copy command' />
                  </div>
                  <div className='p-4 overflow-x-auto text-sm'>
                    <CodeBlock code={usageCommand} language='javascript' />
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      <section id='features' aria-labelledby='features-title' className='mb-16'>
        <h2 id='features-title' className='text-3xl font-bold mb-6'>
          Features
        </h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureCard
            id='string-division'
            title='String Division'
            aria-labelledby='feature-string-division'
            description='Divide strings by index positions or character delimiters with a simple API.'
          />
          <FeatureCard
            id='array-processing'
            title='Array Processing'
            aria-labelledby='feature-array-processing'
            description='Process arrays of strings with the same intuitive interface.'
          />
          <FeatureCard
            id='nested-arrays'
            title='Nested Arrays'
            aria-labelledby='feature-nested-arrays'
            description='Handle complex data structures with support for nested arrays.'
          />
          <FeatureCard
            id='flexible-output'
            title='Flexible Output'
            aria-labelledby='feature-flexible-output'
            description='Get results as arrays or use destructuring for individual variables.'
          />
          <FeatureCard
            id='flattening-option'
            title='Flattening Option'
            aria-labelledby='feature-flattening-option'
            description='Simplify results with the flatten option to get a single-level array.'
          />
          <FeatureCard
            id='mixed-delimiters'
            title='Mixed Delimiters'
            aria-labelledby='feature-mixed-delimiters'
            description='Combine index positions and character delimiters in the same operation.'
          />
        </div>
      </section>

      <section
        id='api-reference'
        aria-labelledby='api-reference-title'
        className='mb-16'
      >
        <h2 id='api-reference-title' className='text-3xl font-bold mb-6'>
          API Reference
        </h2>
        <div className='rounded-lg border border-zinc-800 bg-zinc-900 p-6'>
          <h3 id='divider-function-title' className='text-xl font-bold mb-4'>
            divider(input, ...dividers, options?)
          </h3>
          <div className='mb-4'>
            <h4 id='divider-parameters-title' className='font-semibold mb-2'>
              Parameters:
            </h4>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                  input
                </code>
                : String or array to divide
              </li>
              <li>
                <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                  dividers
                </code>
                : Numbers (index positions) or strings (character delimiters)
              </li>
              <li>
                <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                  options
                </code>
                : Optional configuration object
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold mb-2' id='divider-options-title'>
              Options:
            </h4>
            <ul className='list-disc pl-6'>
              <li>
                <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                  flatten
                </code>
                : Boolean - When true, flattens the result into a single array
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
