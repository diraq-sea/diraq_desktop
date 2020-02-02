module.exports = {
  root: true,
  env: { browser: true, node: true },
  parserOptions: { parser: 'babel-eslint' },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/unicorn',
    'prettier/vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
  },
}
