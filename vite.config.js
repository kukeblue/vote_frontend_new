import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

// ![]()

export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
  ],
  css: {
      preprocessorOptions: {
          less: {
              javascriptEnabled: false,
          },
      },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://m.fvwboxx.cn/',
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace('/api/', '/'),
      },
    },
   
  },
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        reportCompressedSize: false,
        manualChunks(id) {  
            if (id.includes("node_modules")) {
                return id
                        .toString()
                        .split("node_modules/")[1]
                        .split("/")[0]
                        .toString();
            }
        }
    }
    }
  }
})
