import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Article from '../components/Article.vue'

const routes = [
    {
    path: "/",
    component: Index
},
{
    path: "/article",
    component: Article
}]



const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 如果目标路由包含哈希，则滚动到指定元素
        if (to.hash) {
          return {
            el: to.hash,  // 滚动到目标元素
            behavior: 'smooth',  // 平滑滚动
          }
        }
      }
})

export default router;