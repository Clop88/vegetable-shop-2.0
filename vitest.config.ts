import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true,
    setupFiles: ['./vegetable-shop/src/test/setup.ts'], 
  },
});