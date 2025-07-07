import axiosInstance from './axiosInstance.js';
import { getAccessToken } from '../auth/authService.js';

export async function fetchUserDetails() {
    try {
        const res = await axiosInstance.get('/user/me');
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
        const res = await axiosInstance.put('/user/email', userData);
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
        const res = await axiosInstance.put('/user/password', userData);
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
        const res = await axiosInstance.put('/user/phone', userData);
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
        const res = await axiosInstance.delete('/user', {
            data: passwordData,
            Authorization: `Bearer ${accessToken}`,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        if (res.status !== 204) {
            throw new Error('Failed to delete user account');
        }
        return res;
    } catch (error) {
        throw error;
    }
}

export async function fetchUserById(userId) {
    try {
        const res = await axiosInstance.get(`/user/${userId}`);
        if (res.status !== 200) {
            throw new Error('Failed to fetch user by ID');
        }
        return res;
    } catch (error) {
        throw error;
    }
}