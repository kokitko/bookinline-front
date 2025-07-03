import axiosInstance from './axiosInstance';

export const fetchReviews = async (propertyId, page, size) => {
    try {
        return await axiosInstance.get(`/reviews/property/${propertyId}?page=${page}&size=${size}`);
    } catch (error) {
        throw error;
    }
};

export const fetchHasReview = async (propertyId) => {
    try {
        return await axiosInstance.get(`/reviews/property/${propertyId}/has-review`);
    } catch (error) {
        throw error;
    }
};

export const fetchLeaveReview = async (propertyId, info) => {
    try {
        console.log('Submitting review for property:', propertyId, 'with info:', info);
        return await axiosInstance.post(`/reviews/property/${propertyId}`, info);
    } catch (error) {
        throw error;
    }
};

export const fetchUserReviews = async (userId, page, size) => {
    try {
        return await axiosInstance.get(`/reviews/user/${userId}?page=${page}&size=${size}`);
    } catch (error) {
        throw error;
    }
}