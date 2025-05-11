import type { TopDictionary } from '@/types/dictionaries';

export const generateApiReferences = (dict: TopDictionary['top']) => [
  {
    id: 'divider',
    title: 'divider(input, ...dividers, options?)',
    description: dict.api.description.divider,
    parameters: [
      { name: 'input', description: dict.api.function.parameters.input },
      { name: 'dividers', description: dict.api.function.parameters.dividers },
      { name: 'options', description: dict.api.function.parameters.options },
    ],
    options: [
      { name: 'flatten', description: dict.api.function.options.flatten },
      { name: 'trim', description: dict.api.function.options.trim },
      {
        name: 'excludeEmpty',
        description: dict.api.function.options.excludeEmpty,
      },
    ],
  },
  {
    id: 'dividerFirst',
    title: 'dividerFirst(input, ...dividers)',
    description: dict.api.description.dividerFirst,
    parameters: [
      { name: 'input', description: dict.api.function.parameters.input },
      { name: 'dividers', description: dict.api.function.parameters.dividers },
    ],
  },
  {
    id: 'dividerLast',
    title: 'dividerLast(input, ...dividers)',
    description: dict.api.description.dividerLast,
    parameters: [
      { name: 'input', description: dict.api.function.parameters.input },
      { name: 'dividers', description: dict.api.function.parameters.dividers },
    ],
  },
  {
    id: 'dividerLoop',
    title: 'dividerLoop(input, size, options?)',
    description: dict.api.description.dividerLoop,
    parameters: [
      { name: 'input', description: dict.api.function.parameters.input },
      { name: 'size', description: dict.api.function.parameters.size },
      { name: 'options', description: dict.api.function.parameters.options },
    ],
    options: [
      { name: 'flatten', description: dict.api.function.options.flatten },
      { name: 'trim', description: dict.api.function.options.trim },
      {
        name: 'excludeEmpty',
        description: dict.api.function.options.excludeEmpty,
      },
      {
        name: 'startOffset',
        description: dict.api.function.options.startOffset,
      },
      {
        name: 'maxChunks',
        description: dict.api.function.options.maxChunks,
      },
    ],
  },
  {
    id: 'dividerNumberString',
    title: 'dividerNumberString(input, options?)',
    description: dict.api.description.dividerNumberString,
    parameters: [
      { name: 'input', description: dict.api.function.parameters.input },
      { name: 'options', description: dict.api.function.parameters.options },
    ],
    options: [
      { name: 'flatten', description: dict.api.function.options.flatten },
      { name: 'trim', description: dict.api.function.options.trim },
      {
        name: 'excludeEmpty',
        description: dict.api.function.options.excludeEmpty,
      },
    ],
  },
];
