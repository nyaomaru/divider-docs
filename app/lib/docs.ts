import type { Command, Usage } from '@/types/lib/docs';
import {
  isCommandNpm,
  isCommandPnpm,
  isCommandBun,
  isCommandYarn,
  isUsageBasic,
  isUsageAdvanced,
} from '@/utils/is';

export const installTabs: Command[] = ['npm', 'pnpm', 'bun', 'yarn'];
export const usageTabs: Usage[] = ['basic', 'advanced'];

export const installCode = (command: Command) => {
  if (isCommandNpm(command)) return `${command} install @nyaomaru/divider`;
  if (isCommandPnpm(command)) return `${command} install @nyaomaru/divider`;
  if (isCommandBun(command)) return `${command} add @nyaomaru/divider`;
  if (isCommandYarn(command)) return `${command} add @nyaomaru/divider`;

  command satisfies never;

  throw new Error(`Unsupported command: ${command}`);
};

export const usageCode = (usage: Usage) => {
  if (isUsageBasic(usage))
    return `import { divider } from '@nyaomaru/divider';

// divide a string by index position
const helloArray = divider('hello', 1, 3);
// ['h', 'el', 'lo']

const [hello1, hello2, ...restHello] = divider('hello', 1, 3, 4);
// hello1 = 'h'
// hello2 = 'el'
// restHello = ['l', 'o']

// split string using character delimiter
const divideWithString = divider('hello', 'e');
// ['h', 'llo']

const divideWithMultipleString = divider('hello', 'l');
// ['he', 'o']

// divide the array of strings
const words = ['hello', 'world'];
const dividedWords = divider(words, 2);
// [['he', 'llo'], ['wo', 'rld']]

const dividedWordsWithFlattenOption = divider(words, 2, { flatten: true });
// ['he', 'llo', 'wo', 'rld']

const dividedWithTrimOption = divider([' hello ', ' world '], 2, { trim: true });
// ['h', 'ello', 'w', 'orld']`;

  if (isUsageAdvanced(usage))
    return `// mixed use of indexes and characters
const complexDivide = divider('hello world', 3, 'o');
// ['hel', 'l', 'w', 'rld']

// Processing nested arrays
const nestedArray = divider(['hello', 'new world'], ' ', 2);
// [[['he', 'llo'], ['ne', 'w wor', 'ld']]

// flattening option to get a single array
const flatArray = divider(['hello', 'new world'], ' ', 2, { flatten: true });
// ['he', 'llo', 'ne', 'w', 'wor', 'ld']`;

  usage satisfies never;

  throw new Error(`Unsupported usage: ${usage}`);
};
