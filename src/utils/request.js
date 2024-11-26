export const BASE_IP = location.hostname;
export const BASE_PORT = '8080';
export const BASE_URL = `http://${BASE_IP}:${BASE_PORT}`;
export const LOGIN_API = `${BASE_URL}/user/auth/login`;
export const SEND_EMAIL_API = `${BASE_URL}/user/reg/verify`;
export const REGISTER_API = `${BASE_URL}/user/reg/create`;
export const USERSEARCH_API = `${BASE_URL}/user/search`;