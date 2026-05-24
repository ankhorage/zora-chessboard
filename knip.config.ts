import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['examples/basic-chess/App.tsx'],
  ignoreFiles: ['.prettierrc.js', 'eslint.config.mjs', 'paradox.config.ts'],
});
