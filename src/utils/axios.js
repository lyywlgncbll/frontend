import axios from 'axios';
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
// instance.interceptors.response.use(response => {
//     return response;
// }, error => {
//     // 错误处理（如 token 过期等）
//     if (error.response && error.response.status === 401) {
//         // 处理未授权的错误，例如跳转到登录页
//     }
//     return Promise.reject(error);
// });

// 导出配置好的 Axios 实例
export default instance;
