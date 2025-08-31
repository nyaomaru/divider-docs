import type { APIReferenceCardProps } from '@/types/ui/divider-docs/api-reference-card';

export function APIReferenceCard({
  title,
  description,
  parameters,
  options,
}: APIReferenceCardProps) {
  return (
    <div className='rounded-lg border border-zinc-200 bg-white p-6 space-y-6 dark:border-zinc-800 dark:bg-zinc-900'>
      <div>
        <h3 className='text-xl font-bold mb-2'>{title}</h3>
        {description && <p>{description}</p>}
      </div>

      <div>
        <h4 className='font-semibold mb-2'>Parameters:</h4>
        <ul className='list-disc pl-6 space-y-2'>
          {parameters.map((param) => (
            <li key={param.name}>
              <code className='text-sm bg-zinc-100 px-1 py-0.5 rounded dark:bg-zinc-800'>
                {param.name}
              </code>{' '}
              : {param.description}
            </li>
          ))}
        </ul>
      </div>

      {options?.length > 0 && (
        <div>
          <h4 className='font-semibold mb-2'>Options:</h4>
          <ul className='list-disc pl-6 space-y-2'>
            {options.map((option) => (
              <li key={option.name}>
                <code className='text-sm bg-zinc-100 px-1 py-0.5 rounded dark:bg-zinc-800'>
                  {option.name}
                </code>{' '}
                : {option.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
