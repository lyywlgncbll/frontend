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
  build: {
    minify: false,
  },
  server: {
    port: 80,
    host: true,  // 允许外部访问
  }

})