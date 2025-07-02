import axiosInstance from "./axiosInstance";

export const createBooking = async (bookingData, propertyId) => {
    try {
        const response = await axiosInstance.post(`/bookings/property/${propertyId}`, bookingData);
        console.log("Response from booking creation:", response);
        return response;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const getBookedDates = async (propertyId) => {
    try {
        const response = await axiosInstance.get(`/bookings/property/${propertyId}/dates`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchMyBookings = async (page = 0, size = 10) => {
    try {
        const response = await axiosInstance.get(`/bookings/user`, {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchBookingDetails = async (bookingId) => {
    try {
        const response = await axiosInstance.get(`/bookings/${bookingId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
