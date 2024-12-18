import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  json: {
    namedExports: true, // Permite importações nomeadas de JSON
    stringify: false,   // Não converte JSON automaticamente em strings
  },
});
