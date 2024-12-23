import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as Icons from '@element-plus/icons-vue';
import vuetyped from 'vue3typed'

const app = createApp(App)

for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component);
}
app.use(router)
app.use(vuetyped)
app.use(ElementPlus)

import 'virtual:windi.css'
app.mount('#app')
