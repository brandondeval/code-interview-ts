/// <reference types="vitest/config" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    exclude: ['node_modules', 'solutions/test'],
    includeSource: ['app/*.{js,ts}']
  },
})