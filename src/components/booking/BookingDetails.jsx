import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookingDetails, cancelBooking, confirmBooking } from '*/api/bookings.js';
import { fetchUserById } from '*/api/users.js';
import { useAuth } from '*/auth/AuthContext.jsx';
import { fetchHasReview } from '*/api/reviews.js';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [booking, setBooking] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showLeaveReview, setShowLeaveReview] = useState(false);

    useEffect(() => {
        const getBookingDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetchBookingDetails(id);
                if (response.data) {
                    setBooking(response.data);
                    if (user && user.role === 'HOST') {
                        const guestRes = await fetchUserById(response.data.guestId);
                        setOtherUser(guestRes.data);
                    } else if (user && user.role === 'GUEST') {
                        const hostRes = await fetchUserById(response.data.hostId);
                        setOtherUser(hostRes.data);
                    }
                }
            } catch (err) {
                setError('Failed to load booking details.');
            } finally {
                setLoading(false);
            }
        };
        getBookingDetails();
    }, [id, user]);

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
                    setShowLeaveReview(!response.data);
                } catch (err) {
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
            cancelBooking(booking.id).then(() => {
                window.location.reload();
            });
        }
    };

    const handleConfirmBooking = () => {
        if (window.confirm('Are you sure you want to confirm this booking?')) {
            confirmBooking(booking.id).then(() => {
                window.location.reload();
            })
        }
    }

    const showCancelBooking =
        booking.status === 'PENDING' &&
        user &&
        user.role === 'GUEST' &&
        booking.guestId === user.id;

    const showConfirmBooking =
        booking.status === 'PENDING' &&
        user &&
        user.role === 'HOST' &&
        booking.hostId === user.id;

    let infoBlockTitle = '';
    let infoBlockData = null;
    if (user && user.role === 'GUEST') {
        infoBlockTitle = 'Host Info';
        infoBlockData = otherUser;
    } else if (user && user.role === 'HOST') {
        infoBlockTitle = 'Guest Info';
        infoBlockData = otherUser;
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
                {showConfirmBooking && (
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
                        onClick={handleConfirmBooking}
                    >
                        Confirm Booking
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
            {infoBlockData && (
                <div className="mb-4 border-t pt-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{infoBlockTitle}</h3>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Full Name:</span>
                        <span className="ml-2 text-gray-900">{infoBlockData.fullName}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900">{infoBlockData.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Phone Number:</span>
                        <span className="ml-2 text-gray-900">
                            {infoBlockData.phoneNumber ? infoBlockData.phoneNumber : <span className="text-gray-400">N/A</span>}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;