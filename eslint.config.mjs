// @ts-check
import {
  dirname, join
} from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import json from '@eslint/json'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default tseslint.config(
  {
    name: 'ignores',
    ignores: [
      'dist',
      '/**/node_modules/*',
      'node_modules/',
      'dist/',
      'package/',
      'package-lock.json'
    ]
  },

  // root files
  {
    name: 'Root files tsc options',
    files: ['*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    }
  },
  {
    name: 'Scripts stylistic ts recommended rules',
    files: ['*.ts'],
    plugins: { '@stylistic': stylistic },
    extends: [...tseslint.configs.recommended, ...tseslint.configs.stylistic, stylistic.configs['recommended-flat']],
    rules: {
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1
        }
      ],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          },
          multilineDetection: 'brackets'
        }
      ],
      '@stylistic/object-property-newline': ['error'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never'],

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-empty-function': ['warn']
    }
  },

  {
    name: 'JS',
    files: ['*.js'],
    plugins: {
      js,
      '@stylistic': stylistic
    },
    extends: [js.configs.recommended, stylistic.configs['recommended-flat']],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1
        }
      ],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          },
          multilineDetection: 'brackets'
        }
      ],
      '@stylistic/object-property-newline': ['error'],
      '@stylistic/object-curly-newline': ['error', { multiline: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never']
    }
  },

  // lint JSON files
  {
    files: ['*.json'],
    plugins: {
      json,
      '@stylistic': stylistic
    },
    ignores: ['package-lock.json'],
    language: 'json/json',
    extends: [json.configs.recommended]
  },

  // lint JSONC files
  {
    files: ['*.jsonc'],
    plugins: {
      json,
      '@stylistic': stylistic
    },
    language: 'json/jsonc',
    extends: [json.configs.recommended]
  },

  // lint JSON5 files
  {
    files: ['*.json5'],
    plugins: {
      json,
      '@stylistic': stylistic
    },
    language: 'json/json5',
    extends: [json.configs.recommended]
  }
)
