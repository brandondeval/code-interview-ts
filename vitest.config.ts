/// <reference types="vitest/config" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['test', 'node_modules'],
    includeSource: ['app/*.{js,ts}']
  },
})