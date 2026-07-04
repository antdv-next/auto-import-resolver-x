import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  formatters: {
    css: true,
  },
}, {
  files: [
    'tests/**/*',
  ],
  rules: {
    'no-console': 0,
    'no-restricted-globals': 0,
  },
})
