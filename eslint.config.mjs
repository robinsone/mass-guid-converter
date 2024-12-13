import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  features: {
    stylistic: {
      commaDangle: 'always-multiline',
    },
    tooling: true,
  },
})
