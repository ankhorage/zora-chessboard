import { defineParadoxConfig } from '@ankhorage/paradox';

export default defineParadoxConfig({
  mode: 'write',

  docs: {
    title: '@ankhorage/zora-chess',
    description: 'Chess UI components for React Native and React Native Web apps built on ZORA.',
    usage: {
      entrypoints: ['examples/basic-chess/App.tsx'],
    },
  },

  package: {
    root: '.',
    entrypoints: ['src/index.ts'],
  },

  output: {
    dir: './paradox',
  },
});
