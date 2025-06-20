import axiosInstance from './axiosInstance';

export const fetchReviews = (propertyId, page, size) => {
    const data = axiosInstance.get(`/reviews/property/${propertyId}?page=${page}&size=${size}`);
    return data;
}