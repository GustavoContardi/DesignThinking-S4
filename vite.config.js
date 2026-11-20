import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuracion minima: Vue SFC + servidor accesible en la red local
// (util para abrir la presentacion desde el celular durante la clase).
export default defineConfig({
  plugins: [vue()],
  server: { host: true, port: 5173 },
  build: { target: 'es2020' }
})
