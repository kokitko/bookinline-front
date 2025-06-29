import axios from './axiosInstance.js';

export async function fetchUserDetails() {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        const res = await axios.get('/user/me');
        if (res.status !== 200) {
            throw new Error('Failed to fetch user details');
        }
        return res;
    } catch (error) {
        throw error;
    }
}