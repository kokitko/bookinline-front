import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookingDetails } from '../api/bookings.js';
import { fetchUserById } from '../api/users.js';

const BookingDetails = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [host, setHost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBookingDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetchBookingDetails(id);
                setBooking(response.data);

                if (response.data && response.data.hostId) {
                    const hostRes = await fetchUserById(response.data.hostId);
                    setHost(hostRes.data);
                }
            } catch (err) {
                setError('Failed to load booking details.');
            } finally {
                setLoading(false);
            }
        };
        getBookingDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-gray-500 text-lg">Loading booking details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-red-500 text-lg">{error}</span>
            </div>
        );
    }

    if (!booking) {
        return null;
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking Details</h2>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Guest Name:</span>
                <span className="ml-2 text-gray-900">{booking.guestName}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Property Title:</span>
                <span className="ml-2 text-gray-900">{booking.propertyTitle}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Check-In Date:</span>
                <span className="ml-2 text-gray-900">{booking.checkInDate}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-700">Check-Out Date:</span>
                <span className="ml-2 text-gray-900">{booking.checkOutDate}</span>
            </div>
            <div className="mb-6">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="ml-2 text-gray-900">{booking.status}</span>
            </div>
            {host && (
                <div className="mb-4 border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Host Info</h3>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Full Name:</span>
                        <span className="ml-2 text-gray-900">{host.fullName}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900">{host.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Phone Number:</span>
                        <span className="ml-2 text-gray-900">
                            {host.phoneNumber ? host.phoneNumber : <span className="text-gray-400">N/A</span>}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;