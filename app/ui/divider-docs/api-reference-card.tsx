import type { FC } from 'react';

interface APIReferenceCardProps {
  title: string;
  description?: string;
  parameters: {
    name: string;
    description: string;
  }[];
  options?: {
    name: string;
    description: string;
  }[];
}

export const APIReferenceCard: FC<APIReferenceCardProps> = ({
  title,
  description,
  parameters,
  options,
}) => {
  return (
    <div className='rounded-lg border border-zinc-800 bg-zinc-900 p-6'>
      <h3 className='text-xl font-bold mb-4'>{title}</h3>
      <p>{description}</p>
      <div className='m-4'>
        <h4 className='font-semibold mb-2'>Parameters:</h4>
        <ul className='list-disc pl-6 space-y-2'>
          {parameters.map((param) => (
            <li key={param.name}>
              <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                {param.name}
              </code>
              : {param.description}
            </li>
          ))}
        </ul>
      </div>
      {options && options.length > 0 && (
        <div className='m-4'>
          <h4 className='font-semibold mb-2'>Options:</h4>
          <ul className='list-disc pl-6'>
            {options.map((option) => (
              <li key={option.name}>
                <code className='text-sm bg-zinc-800 px-1 py-0.5 rounded'>
                  {option.name}
                </code>
                : {option.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
