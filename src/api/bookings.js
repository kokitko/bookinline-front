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
