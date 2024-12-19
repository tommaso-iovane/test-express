import globals from 'globals'
import pluginJs from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    {
        rules: {
            indent: ['warn', 4, { 'SwitchCase': 1 }],
            'linebreak-style': ['warn', 'unix'],
            quotes: ['warn', 'single'],
            semi: ['warn', 'never'],
            'no-unused-vars': ['warn', {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'caughtErrorsIgnorePattern': '^_'
            }],
            'arrow-parens': [1, 'always']
            // 'svelte/valid-compile': ['error', { 'ignoreWarnings': true }]
        }
    }
]