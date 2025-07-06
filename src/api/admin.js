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
        const response = await axiosInstance.put(`/admin/warn/${userId}`, null, {
            params: { reason }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const banUser = async (userId, reason) => {
    try {
        const response = await axiosInstance.delete(`/admin/ban/${userId}`, {
            params: { reason }
        });
        return response; 
    } catch (error) {
        throw error;
    }
}

export const unbanUser = async (userId, reason) => {
    try {
        const response = await axiosInstance.put(`/admin/unban/${userId}`, null, {
            params: { reason }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchUserDetails = async (userId) => {
    try {
        const response = await axiosInstance.get(`/admin/users/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}