/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  /* 忽略除了App.vue之外，取文件名没有大驼峰命名导致eslint报错Component name "*" should always be multi-word */
  'vue/nulti-word-component-name': [
    'error',
    {
      ignores: ['Index', 'Computed', 'Watch', 'VForObject']
    }
  ]
};
