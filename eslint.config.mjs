// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(eslintPluginPrettierRecommended, {
	rules: {
		curly: 'off',
		camelcase: 'off',
		'arrow-parens': 'off',
		'comma-dangle': ['error', 'always-multiline'],
		'prettier/prettier': [2, { useTabs: true }],
		// Vue
		'vue/no-v-html': 'off',
		'vue/no-reserved-component-names': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/script-setup-no-uses-vars': 'off',
		'vue/no-multiple-template-root': 'off',
		// TypeScript
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-dynamic-delete': 'off',
	},
})
