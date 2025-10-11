import { equals } from 'is-kit';

// Use is-kit primitives directly without local wrappers
export const isCommandNpm = equals('npm');
export const isCommandPnpm = equals('pnpm');
export const isCommandBun = equals('bun');
export const isCommandYarn = equals('yarn');

export const isUsageBasic = equals('basic');
export const isUsageAdvanced = equals('advanced');
