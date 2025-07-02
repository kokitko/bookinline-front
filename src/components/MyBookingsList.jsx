import React, { useEffect, useState } from "react";
import { fetchMyBookings } from "../api/bookings.js";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export default function MyBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchMyBookings(page, PAGE_SIZE)
            .then((res) => {
                setBookings(res.data.bookings);
                setTotalPages(res.data.totalPages);
            })
            .finally(() => setLoading(false));
    }, [page]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No bookings found.</div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white shadow rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between"
                        >
                            <div>
                                <div className="text-lg font-semibold">{booking.propertyTitle}</div>
                                <div className="text-gray-600">
                                    <span className="font-medium">Check-in:</span> {booking.checkInDate}
                                    <span className="mx-2">|</span>
                                    <span className="font-medium">Check-out:</span> {booking.checkOutDate}
                                </div>
                                <div className="text-gray-500 text-sm mt-1">
                                    Status: <span className="font-semibold">{booking.status}</span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-2">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                                    onClick={() => navigate(`/property/${booking.propertyId}`)}
                                >
                                    View Property
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
                                    onClick={() => navigate(`/booking/${booking.id}`)}
                                >
                                    Booking Info
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span className="px-3 py-1 text-gray-700">
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}