import axios from '../api/axiosInstance.js';

let accessToken = null;

export async function login(credentials) {
    const res = await axios.post('/auth/login', credentials);
    if (res.status !== 200) {
        throw new Error('Login failed');
    }
    accessToken = res.data.accessToken;
    sessionStorage.setItem('accessToken', accessToken);
    return res;
}

export async function register(userData) {
    const res = await axios.post('/auth/register', userData);
    if (res.status !== 200) {
        throw new Error('Registration failed');
    }
    accessToken = res.data.accessToken;
    sessionStorage.setItem('accessToken', accessToken);
    return res;
}

export function logout() {
    accessToken = null;
    sessionStorage.removeItem('accessToken');
    return axios.post('/auth/logout');
}

export function getAccessToken() {
    if (!accessToken) {
        accessToken = sessionStorage.getItem('accessToken');
    }
    return accessToken;
}

export async function refreshToken() {
    const res = await axios.post('/auth/refresh-token');
    accessToken = res.data.accessToken;
    sessionStorage.setItem('accessToken', accessToken);
}