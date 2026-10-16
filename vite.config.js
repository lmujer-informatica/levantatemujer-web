import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vite solo expone al navegador las variables con estos prefijos.
  // FORMSPREE_* son endpoints públicos de formularios (no secretos).
  envPrefix: ['VITE_', 'FORMSPREE_'],
});
