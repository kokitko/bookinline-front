import axiosInstance from './axiosInstance';

export const register = async (userData) => {
    const res = await axiosInstance.post(
        '/auth/register', 
        userData
    );

    return res;
}

export const login = async (credentials) => {
    const res = await axiosInstance.post(
        '/auth/login', 
        credentials
    );

    return res;
}