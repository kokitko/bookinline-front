import axiosInstance from './axiosInstance';

export const fetchProperties = (page, size) => {
    const data = axiosInstance.get(`/properties/available?page=${page}&size=${size}`);
    return data;
}

export const fetchFilteredProperties = (filter, page, size) => {
    const data = axiosInstance.post(
        `/properties/filter?page=${page}&size=${size}`,
        filter
    );
    return data;
}

export const fetchPropertyDetails = (propertyId) => {
    const data = axiosInstance.get(`/properties/${propertyId}`);
    return data;
}