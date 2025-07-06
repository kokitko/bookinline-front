import axiosInstance from './axiosInstance.js';

export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/admin/users');
        return response;
    }
    catch (error) {
        throw error;
    }
}

export const fetchUsersByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/admin/users/status/${status}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const warnUser = async (userId, reason) => {
    try {
        const response = await axiosInstance.post(`/admin/warn/${userId}`, null, {
            params: { reason }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const banUser = async (userId, reason) => {
    try {
        const response = await axiosInstance.delete(`/admin/ban/${userId}`, null, {
            params: { reason }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const unbanUser = async (userId, reason) => {
    try {
        const response = await axiosInstance.post(`/admin/unban/${userId}`, null, {
            params: { reason }
        });
        return response;
    } catch (error) {
        throw error;
    }
}