import axiosInstance from "./axiosInstance";

export const createBooking = async (bookingData, propertyId) => {
    try {
        const response = await axiosInstance.post(`/bookings/property/${propertyId}/book`, bookingData);
        return response;
    } catch (error) {
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

export const fetchMyBookings = async (page, size) => {
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

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.delete(`/bookings/${bookingId}/cancel`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchHostBookings = async (status, page, size) => {
    try {
        const response = await axiosInstance.get(`/bookings/host/${status}`, {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const confirmBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.put(`/bookings/${bookingId}/confirm`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchGuestBookingsByStatus = async (status, page, size) => {
    try {
        const response = await axiosInstance.get(`/bookings/guest/${status}`, {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

