import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'


const routes = [{
    path: "/",
    component:Index
}]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;