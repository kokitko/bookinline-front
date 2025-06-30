import { apiUrl } from '../config.js';
import axiosInstance from '../api/axiosInstance.js';
import axios from 'axios';

let accessToken = null;

export async function login(credentials) {
    const res = await axiosInstance.post('/auth/login', credentials);
    if (res.status !== 200) {
        throw new Error('Login failed');
    }
    accessToken = res.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    return res;
}

export async function register(userData) {
    const res = await axiosInstance.post('/auth/register', userData);
    if (res.status !== 200) {
        throw new Error('Registration failed');
    }
    accessToken = res.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    return res;
}

export function logout() {
    accessToken = null;
    localStorage.removeItem('accessToken');
    return axiosInstance.post('/auth/logout');
}

export function getAccessToken() {
    if (!accessToken) {
        accessToken = localStorage.getItem('accessToken');
    }
    return accessToken;
}

export async function refreshToken() {
    try {
        const res = await axios.post(
            `${apiUrl}/api/auth/refresh-token`,
            {},
            { withCredentials: true }
        );
        accessToken = res.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return res;
    } catch (err) {
        accessToken = null;
        localStorage.removeItem('accessToken');
        throw err;
    }
}