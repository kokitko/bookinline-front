import axiosInstance from './axiosInstance';

export const fetchImage = async (imageUrl) => {
    const key = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const res = await axiosInstance.get(`/s3/presigned-url?key=${key}`);
    return res.data.url;
}