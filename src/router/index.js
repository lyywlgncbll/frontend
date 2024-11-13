import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import searchArticle from '~/pages/searchArticle.vue'


const routes = [{
    path: "/",
    component:searchArticle
}]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;