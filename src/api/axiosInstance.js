import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;