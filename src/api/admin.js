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

export const fetchAllProperties = async (page, size) => {
    try {
        const response = await axiosInstance.get('/admin/properties', {
            params: { page, size }
        });
        console.log("Response from fetchAllProperties:", response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchPropertiesByType = async (type, page, size) => {
    try {
        const response = await axiosInstance.get(`/admin/properties/type/${type}`, {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const changePropertyAvailability = async (propertyId) => {
    try {
        console.log(`Changing availability for property ID: ${propertyId}`);
        const response = await axiosInstance.put(`/admin/property/${propertyId}`);
        console.log("Response from property availability change:", response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchAllBookings = async (page, size) => {
    try {
        const response = await axiosInstance.get('/admin/bookings', {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchBookingsByStatus = async (status, page, size) => {
    try {
        const response = await axiosInstance.get(`/admin/bookings/status/${status}`, {
            params: { page, size }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axiosInstance.delete(`/admin/booking/${bookingId}`);
        return response;
    } catch (error) {
        throw error;
    }
}