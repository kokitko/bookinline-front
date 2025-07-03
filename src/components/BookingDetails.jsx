import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookingDetails, cancelBooking } from '../api/bookings.js';
import { fetchUserById } from '../api/users.js';
import { useAuth } from '../auth/AuthContext';
import { fetchHasReview } from '../api/reviews.js';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [booking, setBooking] = useState(null);
    const [host, setHost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showLeaveReview, setShowLeaveReview] = useState(false);

    useEffect(() => {
        const getBookingDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetchBookingDetails(id);
                if (response.data && response.data.hostId) {
                    setBooking(response.data);
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

    useEffect(() => {
        const checkReviewStatus = async () => {
            if (
                booking &&
                booking.status === 'CHECKED_OUT' &&
                user &&
                user.role === 'GUEST' &&
                booking.guestId === user.id
            ) {
                try {
                    const response = await fetchHasReview(booking.propertyId);
                    if (response.data) {
                        setShowLeaveReview(false);
                    } else {
                        setShowLeaveReview(true);
                    }
                } catch (err) {
                    console.error('Failed to check review status:', err);
                    setShowLeaveReview(false);
                }
            } else {
                setShowLeaveReview(false);
            }
        };
        checkReviewStatus();
    }, [booking, user]);

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

    const handleLeaveReview = () => {
        navigate(`/property/${booking.propertyId}/review`);
    };

    const handleCancelBooking = () => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            cancelBooking(booking.id)
                .then(() => {
    const showCancelBooking =
        booking &&
        booking.status === 'PENDING' &&
        user &&
        user.role === 'GUEST' &&
        booking.guestId === user.id;
                });
        }
    };
    
    const showCancelBooking =
        booking.status === 'PENDING' &&
        user &&
        user.role === 'GUEST' &&
        booking.guestId === user.id;

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
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="ml-2 text-gray-900">{booking.status}</span>
                </div>
                {showCancelBooking && (
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                        onClick={handleCancelBooking}
                    >
                        Cancel Booking
                    </button>
                )}
                {showLeaveReview && (
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={handleLeaveReview}
                    >
                        Leave Review
                    </button>
                )}
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