import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Login from "../pages/user/login.vue";
import Register from "../pages/user/register.vue";
import ResetPassword from "~/pages/user/resetPassword.vue";


const routes = [{
    path: "/",
    component:Index
},{
    path: "/login",
    component: Login,
    meta: { requiresGradient: true }
},{
    path: "/register",
    component: Register,
    meta: { requiresGradient: true }
},{
    path: "/resetPassword",
    component: ResetPassword,
    meta: { requiresGradient: true }
}]



const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;