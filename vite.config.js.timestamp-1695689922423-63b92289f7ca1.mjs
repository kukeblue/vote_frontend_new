// vite.config.js
import { defineConfig } from "file:///E:/project/vote_frontend_new/node_modules/vite/dist/node/index.js";
import react from "file:///E:/project/vote_frontend_new/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import WindiCSS from "file:///E:/project/vote_frontend_new/node_modules/vite-plugin-windicss/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    WindiCSS()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: false
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3e3,
    open: false,
    proxy: {
      "/api": {
        target: "https://m.kukechen.top/",
        changeOrigin: true,
        // 允许跨域
        rewrite: (path2) => path2.replace("/api/", "/")
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        reportCompressedSize: false,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHZvdGVfZnJvbnRlbmRfbmV3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHZvdGVfZnJvbnRlbmRfbmV3XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3ZvdGVfZnJvbnRlbmRfbmV3L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgV2luZGlDU1MgZnJvbSAndml0ZS1wbHVnaW4td2luZGljc3MnXG5cbi8vICFbXSgpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFdpbmRpQ1NTKCksXG4gIF0sXG4gIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICAgIGxlc3M6IHtcbiAgICAgICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogMzAwMCxcbiAgICBvcGVuOiBmYWxzZSxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vbS5rdWtlY2hlbi50b3AvJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTUxNDFcdThCQjhcdThERThcdTU3REZcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoJy9hcGkvJywgJy8nKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgIFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkgeyAgXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsb0JBQW9CO0FBQ3pTLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxjQUFjO0FBSXJCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixtQkFBbUI7QUFBQSxNQUN2QjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFNBQVMsR0FBRztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBRUY7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLHNCQUFzQjtBQUFBLFFBQ3RCLGFBQWEsSUFBSTtBQUNiLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixtQkFBTyxHQUNFLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsVUFDdEI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
