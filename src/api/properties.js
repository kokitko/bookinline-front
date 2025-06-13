import axiosInstance from './axiosInstance';

export const fetchProperties = (page, size) => {
    const data = axiosInstance.get(`/properties/available?page=${page}&size=${size}`);
    return data;
}

export const fetchFilteredProperties = (filter, page, size) => {
    console.log("Fetching filtered properties with filter:", filter);
    const data = axiosInstance.post(
        `/properties/filter?page=${page}&size=${size}`,
        filter
    );
    return data;
}