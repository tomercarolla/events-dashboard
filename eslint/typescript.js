module.exports = {
  extends: [
    'eslint:recommended',
    './rules/javascript.js',
    'plugin:@typescript-eslint/recommended',
    './rules/typescript.js',
    './rules/overrides.js',
    'prettier',
  ],
};
