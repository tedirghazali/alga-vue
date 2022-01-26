import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/app.ts',
      name: 'alga-vue'
    },
    rollupOptions: {
      external: ['vue', 'alga-js'],
      output: {
        globals: {
          vue: 'Vue',
          'alga-js': 'AlgaJS'
        }
      }
    }
  }
})
