import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from "path"
import topLevelAwait from "vite-plugin-top-level-await";


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~":path.resolve(__dirname,"src"),
      "@":path.resolve(__dirname,"src")
    }
  },
  plugins: [vue(), WindiCSS(),
  topLevelAwait({//修复top level await错误
    // The export name of top-level await promise for each chunk module
    promiseExportName: "__tla",
    // The function to generate import names of top-level await promise in each chunk module
    promiseImportName: i => `__tla_${i}`
  })
  ],
  // build: {
  //   target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
  // },
  // server: {
  //   port: 8080
  // }

  //搜索测试用，避免跨域问题
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1237',  // 后端的地址
        changeOrigin: true,               // 修改请求头中的 Origin 字段
        secure: false,  // 如果是 http 请求，设置为 false
      },
    },
    port: 5173,  // 可以指定前端开发服务器的端口
  },
})