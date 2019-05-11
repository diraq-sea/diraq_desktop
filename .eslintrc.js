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
    'no-console': process.env.NODE_ENV === 'development' ? 0 : 2,

    // Delete when `@nuxtjs/eslint-config` is updated
    'no-useless-rename': 2,
    'object-shorthand': 2,
  },
}
