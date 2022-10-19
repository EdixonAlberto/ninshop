import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssNesting from 'postcss-nesting'
import { ViteAliases } from 'vite-aliases'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases()],
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  }
})
