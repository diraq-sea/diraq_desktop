module.exports = {
  root: true,
  env: { browser: true, node: true },
  parserOptions: { parser: 'babel-eslint' },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/vue',
  ],
  rules: {
    // Delete when `@nuxtjs/eslint-config` is updated
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-useless-rename': 2,
    'object-shorthand': 2,
  },
}
