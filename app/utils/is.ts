export const isCommandNpm = (usage: string): usage is 'npm' => {
  return usage === 'npm';
};

export const isCommandPnpm = (usage: string): usage is 'pnpm' => {
  return usage === 'pnpm';
};

export const isCommandBun = (usage: string): usage is 'bun' => {
  return usage === 'bun';
};

export const isCommandYarn = (usage: string): usage is 'yarn' => {
  return usage === 'yarn';
};

export const isUsageBasic = (usage: string): usage is 'basic' => {
  return usage === 'basic';
};

export const isUsageAdvanced = (usage: string): usage is 'advanced' => {
  return usage === 'advanced';
};
