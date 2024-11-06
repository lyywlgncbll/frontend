import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Reader from '../pages/Reader.vue'


const routes = [
    {
        path: "/",
        component:Index
    },
    {
        path: "/reader",
        name: "Reader",
        component: Reader,
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;