import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': pathResolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 1234,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8807'
      }
    },
    fs: {
      allow: ['..', 'public/logic'] // 允许访问 public/logic 文件夹
    }
  },
  optimizeDeps: {
    exclude: ['@logicflow/core']
  },
  build: {
    rollupOptions: {
      external: ['@logicflow/core']
    }
  }
})
