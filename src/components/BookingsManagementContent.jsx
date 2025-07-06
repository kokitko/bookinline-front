
import { fetchAllBookings, fetchBookingsByStatus, cancelBooking } from '*/api/admin.js';
import React, { useEffect, useState } from "react";

const STATUSES = [
    { label: "All", value: "" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Checked Out", value: "CHECKED_OUT" },
];

const PAGE_SIZE = 10;

export default function BookingsManagementContent() {
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (selectedStatus = status, selectedPage = page) => {
        setLoading(true);
        try {
            let response;
            if (selectedStatus) {
                response = await fetchBookingsByStatus(selectedStatus, selectedPage, PAGE_SIZE);
            } else {
                response = await fetchAllBookings(selectedPage, PAGE_SIZE);
            }
            setBookings(response.data.bookings);
            setTotalPages(response.data.totalPages);
        } catch (e) {
            setBookings([]);
            setTotalPages(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [status, page]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(0);
    };

    const handleCancel = async (bookingId) => {
        await cancelBooking(bookingId);
        fetchData();
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h1 className="text-2xl font-bold">Bookings Management</h1>
                <select
                    className="border rounded px-3 py-2 w-full md:w-auto"
                    value={status}
                    onChange={handleStatusChange}
                >
                    {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-10">No bookings found.</div>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                        >
                            <div className="flex-1">
                                <div className="font-semibold text-lg">{b.propertyTitle}</div>
                                <div className="text-gray-600 text-sm">
                                    Booking ID: {b.id}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    Guest: {b.guestName} (ID: {b.guestId})
                                </div>
                                <div className="text-gray-600 text-sm flex items-center gap-2">
                                    Host ID: {b.hostId}
                                    <button
                                        className="ml-2 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                                        onClick={() => window.location.href = `/admin/users/${b.hostId}`}
                                        title="Go to Host"
                                    >
                                        Go to Host
                                    </button>
                                </div>
                                <div className="text-gray-600 text-sm">
                                    Check-in: {b.checkInDate} | Check-out: {b.checkOutDate}
                                </div>
                                <div className="text-gray-600 text-sm">
                                    Status:{" "}
                                    <span
                                        className={
                                            b.status === "CANCELLED"
                                                ? "text-red-500"
                                                : b.status === "CONFIRMED"
                                                ? "text-green-600"
                                                : b.status === "PENDING"
                                                ? "text-yellow-500"
                                                : b.status === "CHECKED_OUT"
                                                ? "text-blue-500"
                                                : ""
                                        }
                                    >
                                        {b.status}
                                    </span>
                                </div>
                            </div>
                            {b.status !== "CANCELLED" && b.status !== "CHECKED_OUT" && (
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
                                    onClick={() => handleCancel(b.id)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-center items-center mt-6 gap-2">
                <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Prev
                </button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 rounded border disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

