import axios from 'axios';

const apiUrl = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;