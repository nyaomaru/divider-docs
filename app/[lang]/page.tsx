import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs';
import { Button } from '@/ui/components/button';
import { CopyButton } from '@/ui/components/copy-button';
import { FeatureCard } from '@/ui/components/feature-card';
import { CodeBlock } from '@/ui/components/code-block';
import { APIReferenceCard } from '@/ui/divider-docs/api-reference-card';
import { installTabs, installCode, usageTabs, usageCode } from '@/lib/docs';
import { getDictionary, type Locale } from '@/lib/dictionaries';
import { generateApiReferences } from '@/lib/api-references';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ja' }, { lang: 'nl' }];
}

export default async function DividerDocs({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang ?? 'en');

  const apiReferences = generateApiReferences(dict.top);

  return (
    <main className='container mx-auto px-4 py-12'>
      <section className='mb-16 flex flex-col items-center text-center'>
        <Link href='https://github.com/nyaomaru/divider'>
          <Image
            className='mb-6'
            src='/logo.svg'
            alt='divider logo'
            width={128}
            height={128}
          />
        </Link>
        <h1 id='divider-title' className='text-4xl font-bold mb-4'>
          {dict.top.title}
        </h1>
        <p className='text-xl text-zinc-400 max-w-2xl mb-8'>
          {dict.top.description}
        </p>

        <Link href={`/${lang}/playground`}>
          <Button variant='outline'>🚀 {dict.top.button.playground} 🚀</Button>
        </Link>
      </section>

      <section
        id='installation'
        aria-labelledby='installation-title'
        className='mb-16'
      >
        <h2 id='installation-title' className='text-3xl font-bold mb-6'>
          {dict.top.installation.title}
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
          {dict.top.usage.title}
        </h2>

        <Tabs defaultValue='basic' className='mb-8'>
          <TabsList className='mb-4'>
            {usageTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab} {dict.top.usage.examples}
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
          {dict.top.features.title}
        </h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureCard
            id='string-division'
            title={dict.top.features.stringDivision.title}
            aria-labelledby='feature-string-division'
            description={dict.top.features.stringDivision.description}
          />
          <FeatureCard
            id='array-processing'
            title={dict.top.features.arrayProcessing.title}
            aria-labelledby='feature-array-processing'
            description={dict.top.features.arrayProcessing.description}
          />
          <FeatureCard
            id='nested-arrays'
            title={dict.top.features.nestedArray.title}
            aria-labelledby='feature-nested-arrays'
            description={dict.top.features.nestedArray.description}
          />
          <FeatureCard
            id='flexible-output'
            title={dict.top.features.flexibleOutput.title}
            aria-labelledby='feature-flexible-output'
            description={dict.top.features.flexibleOutput.description}
          />
          <FeatureCard
            id='flattening-option'
            title={dict.top.features.flatteningOption.title}
            aria-labelledby='feature-flattening-option'
            description={dict.top.features.flatteningOption.description}
          />
          <FeatureCard
            id='mixed-delimiters'
            title={dict.top.features.mixedDelimiters.title}
            aria-labelledby='feature-mixed-delimiters'
            description={dict.top.features.mixedDelimiters.description}
          />
        </div>
      </section>

      <section
        id='api-reference'
        aria-labelledby='api-reference-title'
        className='mb-16'
      >
        <h2 id='api-reference-title' className='text-3xl font-bold mb-6'>
          {dict.top.api.title}
        </h2>
        {apiReferences.map((api) => (
          <div key={api.id} className='mb-8'>
            <APIReferenceCard
              title={api.title}
              description={api.description}
              parameters={api.parameters}
              options={api.options}
            />
          </div>
        ))}

        <div className='text-center mt-8'>
          <Link
            href='https://nyaomaru.github.io/divider/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline hover:text-blue-400'
          >
            📘 {dict.top.api.fullReferenceLinkText}
          </Link>
        </div>
      </section>
    </main>
  );
}
