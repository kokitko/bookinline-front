import axios from 'axios';
import { refreshToken, getAccessToken } from '../auth/authService.js';
import { apiUrl } from '../config.js';

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            const xsrfToken = getXsrfToken();
            if (xsrfToken) {
                config.headers['X-XSRF-TOKEN'] = xsrfToken;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshToken();
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

function getXsrfToken() {
    const xsrfCookie = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    return xsrfCookie ? xsrfCookie.split('=')[1] : null;
}