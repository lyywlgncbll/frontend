import axios from 'axios';
import router from "@/router/index.js";
const BASE_IP = "113.44.131.146";
const BASE_PORT = '8080';
const BASE_URL = `http://${BASE_IP}:${BASE_PORT}`;
// 创建 Axios 实例
const instance = axios.create({
    baseURL: BASE_URL,  // 配置你的基础 API 地址
    timeout: 100000  // 设置请求超时
});

// 请求拦截器：在请求发送前动态设置请求头
instance.interceptors.request.use(config => {
    // 从 localStorage 或 Vuex 中获取 token
    const token = localStorage.getItem('authToken') || '';  // 你可以根据需要使用 Vuex

    // 如果 token 存在，则添加到请求头
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    // 请求错误处理
    return Promise.reject(error);
});

// 响应拦截器（如果需要的话）
// 响应拦截器（如果需要的话）
instance.interceptors.response.use(response => {
    // 成功响应
    return response;
}, error => {
    // 错误处理（如 token 过期等）
    if (error.response) {
        const { status } = error.response;

        // 401 错误 - 未授权
        if (status === 401) {
            // 清除过期 token 或 Vuex 中的状态
            localStorage.removeItem('authToken');  // 清除 token
            router.push('/login');  // 跳转到登录页
        }

        // 你可以根据其他错误码处理
        if (status === 403) {
            // 禁止访问
            alert('Forbidden: You do not have permission.');
        }

        if (status === 500) {
            // 服务器错误
            alert('Server Error. Please try again later.');
        }
    }

    return Promise.reject(error);
});

// 导出配置好的 Axios 实例
export default instance;
