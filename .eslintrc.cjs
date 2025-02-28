module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    // Enable typescript-specific recommended rules
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    // Turns off all rules that are unnecessary or might conflict with Prettier (needs to be last)
    'prettier',
  ],
  plugins: ['unused-imports'],
  rules: {
    // Workaround for bug https://github.com/nuxt/eslint-config/issues/147
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // Don't report unused imports (this is handled by prettier)
    'unused-imports/no-unused-imports': 'off',
    // Report unused variables (except the ones prefixed with an underscore)
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Ensure void operator is not used, except for variable assignment or function return (might be handy for promises)
    'no-void': ['error', { allowAsStatement: true }],
    // Demote this to warning as long as we are still using cjs modules
    'import/named': 'warn',
    // Import order is handled by prettier (which is incompatible with this rule: https://github.com/simonhaenisch/prettier-plugin-organize-imports/issues/65)
    'import/order': 'off',
    // Disable vue2-specific rules (until https://github.com/nuxt/eslint-config/issues/216 is fixed)
    'vue/no-v-model-argument': 'off',
  },
  overrides: [
    {
      files: ['server/**/*.graphql'],
      extends: ['plugin:@graphql-eslint/schema-recommended'],
      rules: {
        // Having an id for a type makes sense (for caching), but the rule is too strict in some cases
        '@graphql-eslint/strict-id-in-types': 'warn',
        // Make sure that mutations returns not a scalar type (best practice: have special return type for each mutation)
        '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
        // Enforces descriptions in your type definitions (reduce to warn since there are too many issues right now)
        '@graphql-eslint/require-description': [
          'warn',
          {
            types: true,
            FieldDefinition: true,
            ObjectTypeDefinition: true,
            DirectiveDefinition: true,
          },
        ],
        // Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.
        '@graphql-eslint/no-duplicate-fields': ['error'],
        // Requires mutation argument to be always called "input" and input type to be called Mutation name + "Input".
        '@graphql-eslint/input-name': [
          'error',
          {
            checkInputType: true,
            // Types name should be pascal case, but mutation names be camel case
            caseSensitiveInputType: false,
          },
        ],
        // Spaced-comment rule only works for JS-style comments using /* or // but not for GraphQL comments using #
        'spaced-comment': 'off',
      },
    },
    {
      files: ['*.ts', '*.vue'],
      // Parser supporting vue files
      parser: 'vue-eslint-parser',
      // Extract graphql tags
      processor: '@graphql-eslint/graphql',
      parserOptions: {
        // Use ts parser for ts files and for the script tag in vue files
        parser: '@typescript-eslint/parser',
        // Correct root
        tsconfigRootDir: __dirname,
        // Path to tsconfig to enable rules that require type information
        project: './tsconfig.json',
        // Correctly handle vue files
        extraFileExtensions: ['.vue'],
      },
      extends: [
        // Enable recommended rules for typescript that use typing information (may be CPU intensive)
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // The graphql processor disables the vue processor, so some rules need to be disenabled
        // TODO: Remove this once https://github.com/eslint/eslint/issues/14745 is fixed and we can use multiple processors
        'vue/comment-directive': 'off',
      },
    },
    {
      files: ['layouts/**/*.vue', 'pages/**/*.vue'],
      rules: {
        // Layouts and pages cannot be confused with HTML components as they are used differently, so no need to worry about single-word names
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      // Configure rules for "virtual" operation files
      files: ['**/*.{ts,vue}/*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      extends: 'plugin:@graphql-eslint/operations-recommended',
      rules: {
        // Enforces unique fragment name.
        '@graphql-eslint/unique-fragment-name': 'error',
        // Enforces unique operation names.
        '@graphql-eslint/unique-operation-name': 'error',
      },
    },
    {
      // Special treatment for test files
      files: ['**/*.test.ts', '**/*.spec.ts'],
      plugins: ['vitest'],
      rules: {
        // Disable typescript rule for unbound methods (false positives in spies/mocks)
        // TODO: Should enable special rule for vitest once this is implemented
        '@typescript-eslint/unbound-method': 'off',
        // Test title must be unique
        'vitest/no-identical-title': 'error',
        // Test title must be lowercase
        // TODO: Activate once https://github.com/veritem/eslint-plugin-vitest/issues/8 is fixed
        // 'vitest/lower-case-title': 'error',
      },
    },
  ],
}
