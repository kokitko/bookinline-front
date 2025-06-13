import axiosInstance from './axiosInstance';

export const fetchProperties = (page, size) => {
    const data = axiosInstance.get(`/properties/available?page=${page}&size=${size}`)
    return data;
}
