import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve( __dirname, './src' )
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import '@/assets/style/base.scss';`
  //     }
  //   }
  // },
  server:{
    host:'localhost',
    port:8080,
    proxy:{
      // "/api":{
      //   target:"http://api-manager.marsview.cc",
      //   changeOrigin: true,
      // },
      "/api":{
        // target:"http://localhost:3000",
        // target:"http://localhost:8081", // docker
        target:"http://43.139.112.71:8081", // 腾讯云
        changeOrigin: true,
      }
    }
  },
  plugins: [vue()]
})
