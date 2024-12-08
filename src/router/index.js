import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import searchArticle from '~/pages/search/searchArticle.vue'
import Index from '~/pages/index.vue'
import Article from '../pages/Article.vue'
import Reader from '../pages/Reader.vue'

import Login from "../pages/user/login.vue";
import Register from "../pages/user/register.vue";
import ResetPassword from "~/pages/user/resetPassword.vue";
import SearchUserResult from "../pages/search/SearchUser.vue"
import TransferResult from "../pages/transfer/transferResult.vue";
import TransferRequest from "../pages/transfer/transferRequest.vue"
import SelectCharacter from "~/pages/user/selectCharacter.vue";
import HomePage from "~/pages/homePage/homePage.vue";
import HotTopic from "@/pages/hotTopic/hotTopic.vue";
const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/reader",
        name: "Reader",
        component: Reader,
    },
    {
        path: "/article",
        component: Article
    },
    {
        path: "/login",
        component: Login,
        meta: { requiresGradient: true }
    },
    {
        path: "/register",
        component: Register,
        meta: { requiresGradient: true }
    },
    {
        path: "/resetPassword",
        component: ResetPassword,
        meta: { requiresGradient: true }
    },
    {
        path: "/search/searchUser/result",
        component: SearchUserResult,
    },
    {
        path: "/search/result",
        component: searchArticle,
    },
    {
        path: "/transfer/transferResult",
        component: TransferResult,
    },
    {
        path: "/transfer/transferRequest",
        component: TransferRequest,
    },{
        path: "/selectCharacter",
        component: SelectCharacter,
        meta: {requiresGradient: true}
    },{
        path: "/home",
        component: HomePage,
    },{
        path:"/hotTopic",
        component:HotTopic,
    }
]


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