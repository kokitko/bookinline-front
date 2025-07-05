import axiosInstance from './axiosInstance';

export const fetchProperties = (page, size) => {
    const response = axiosInstance.get(`/properties/available?page=${page}&size=${size}`);
    return response;
}

export const fetchFilteredProperties = (filter, page, size) => {
    const response = axiosInstance.post(
        `/properties/filter?page=${page}&size=${size}`,
        filter
    );
    return response;
}

export const fetchPropertyDetails = (propertyId) => {
    const response = axiosInstance.get(`/properties/${propertyId}`);
    return response;
}

export const fetchMyProperties = (page, size) => {
    const response = axiosInstance.get(`/properties/host?page=${page}&size=${size}`);
    return response;
}

export const fetchDeleteProperty = (propertyId) => {
    const response = axiosInstance.delete(`/properties/delete/${propertyId}`);
    return response;
}

export const fetchCreateProperty = (propertyData, images = []) => {
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData));
    if (images && images.length > 0) {
        images.forEach(file => {
            formData.append('images', file);
        });
    }
    return axiosInstance.post('/properties/create', formData, {
        headers: {
            'Content-Type': undefined
        }
    });
};

export const fetchEditProperty = (propertyId, propertyData, images = []) => {
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData));
    if (images && images.length > 0) {
        images.forEach(file => {
            formData.append('images', file);
        });
    }
    return axiosInstance.put(`/properties/update/${propertyId}`, formData, {
        headers: {
            'Content-Type': undefined
        }
    });
}
