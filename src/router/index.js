import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import searchArticle from '~/pages/search/searchArticle.vue'
import Article from '../pages/Article.vue'
import authorInfo from '../pages/authorInfo.vue'
import Reader from '../pages/Reader.vue'
import userInfo from '../pages/userInfo.vue'

import HotTopic from "@/pages/hotTopic/hotTopic.vue"
import HomePage from "~/pages/homePage/homePage.vue"

import SelectCharacter from "~/pages/user/selectCharacter.vue"

import ResetPassword from "~/pages/user/resetPassword.vue";
import TransferRequest from "../pages/transfer/transferRequest.vue"
import TransferResult from "../pages/transfer/transferResult.vue"
import Login from "../pages/user/login.vue"
import Register from "../pages/user/register.vue"
import ResetPassword from "../pages/user/resetPassword.vue"
import Audit from '../components/AdminInfo/audit.vue'
import PlatformOverview from '../components/AdminInfo/platform-overview.vue'
import Scholars from '../components/AdminInfo/scholars.vue'
import AdminInfo from '../pages/adminPages/adminInfo.vue'
const routes = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/reader",
        name: "Reader",
        component: Reader,
        props: (route) => ({ id: route.query.id })
    },
    {
        path: "/article",
        name: "Article",
        component: Article,
        props: (route) => ({ id: route.query.id })
    },
    {
        path: "/userInfo",
        component: userInfo,
    },
    {
        path: "/authorInfo",
        component: authorInfo,
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
    }, 
    {
        path: "/selectCharacter",
        component: SelectCharacter,
        meta: { requiresGradient: true }
    }, 
    {
        path: "/home",
        component: HomePage,
    }, 
    {
        path: "/hotTopic",
        component: HotTopic,
    }, 
    {
        path: "/admin",
        component: AdminInfo,
        redirect: "/admin/platformOverview",
        children: [
            {
                path: "/admin/audit",
                component: Audit,
                meta: { keepAlive: true }
            }, {
                path: "/admin/platformOverview",
                component: PlatformOverview,
                meta: { keepAlive: true }
            }, {
                path: "/admin/scholars",
                component: Scholars,
                meta: { keepAlive: true }
            }]
    },
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