import axios from './axiosInstance.js';
import { getAccessToken } from '../auth/authService.js';

export async function fetchUserDetails() {
    try {
        const accessToken = getAccessToken();
        const res = await axios.get('/user/me');
        if (res.status !== 200) {
            throw new Error('Failed to fetch user details');
        }
        return res;
    } catch (error) {
        throw error;
    }
}

export async function updateUserEmail(userData) {
    try {
        const accessToken = getAccessToken();
        const res = await axios.put('/user/email', userData);
        if (res.status !== 200) {
            throw new Error('Failed to update user details');
        }
        return res;
    } catch (error) {
        throw error;
    }
}

export async function updateUserPassword(userData) {
    try {
        const accessToken = getAccessToken();
        const res = await axios.put('/user/password', userData);
        if (res.status !== 200) {
            throw new Error('Failed to update user password');
        }
        return res;
    } catch (error) {
        throw error;
    }
}

export async function updateUserPhoneNumber(userData) {
    try {
        const accessToken = getAccessToken();
        const res = await axios.put('/user/phone', userData);
        if (res.status !== 200) {
            throw new Error('Failed to update user phone number');
        }
        return res;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserAccount(passwordData) {
    try {
        const accessToken = getAccessToken();
        const res = await axios.delete('/user', passwordData);
        if (res.status !== 204) {
            throw new Error('Failed to delete user account');
        }
        return res;
    } catch (error) {
        throw error;
    }
}