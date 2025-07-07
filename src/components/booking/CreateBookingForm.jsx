import React, { useState } from "react";
import BookingDates from "*/components/booking/BookingDates.jsx";
import { useAuth } from "*/auth/AuthContext.jsx";
import { createBooking, getBookedDates } from "*/api/bookings.js";
import { useNavigate } from "react-router-dom";


function CreateBookingForm({ pricePerNight, propertyId }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({ checkIn: null, checkOut: null });
    const [showCalendar, setShowCalendar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const calendarButtonRef = React.useRef(null);

    const [bookedDates, setBookedDates] = useState([]);
    React.useEffect(() => {
        let isMounted = true;
        async function fetchBookedDates() {
            try {
                const res = await getBookedDates(propertyId);
                if (isMounted) {
                    setBookedDates(res.data || []);
                }
            } catch (e) {
                if (isMounted) {
                    setBookedDates([]);
                }
            }
        }
        fetchBookedDates();
        return () => { isMounted = false; };
    }, [propertyId]);

    const navigate = useNavigate();

    const getNights = () => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const [inDay, inMonth, inYear] = formData.checkIn.split("/").map(Number);
        const [outDay, outMonth, outYear] = formData.checkOut.split("/").map(Number);
        const inDate = new Date(inYear, inMonth - 1, inDay);
        const outDate = new Date(outYear, outMonth - 1, outDay);
        const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
        return nights;
    };

    const totalNights = getNights();
    const totalPrice = Math.round(totalNights * pricePerNight);

    const handleBook = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await createBooking({
                checkInDate: formData.checkIn,
                checkOutDate: formData.checkOut,
            }, propertyId);
            if (res.status === 200) {
                navigate("/");
            };
        } catch (e) {
            setError("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-5 mt-10">
            <div className="space-y-1">
                <div>
                    <strong className="text-gray-700">Name:</strong> <span className="text-gray-900">{user.fullName}</span>
                </div>
                <div>
                    <strong className="text-gray-700">Email:</strong> <span className="text-gray-900">{user.email}</span>
                </div>
                <div>
                    <strong className="text-gray-700">Phone:</strong> <span className="text-gray-900">{user.phoneNumber}</span>
                </div>
                <div className="mb-4">
                    <div
                        ref={calendarButtonRef}
                        className="border rounded p-2 w-full cursor-pointer bg-gray-50"
                        onClick={() => setShowCalendar(true)}
                    >
                        {formData.checkIn && formData.checkOut
                            ? `${formData.checkIn} — ${formData.checkOut}`
                            : "Select dates"}
                    </div>
                </div>
            </div>
            <BookingDates
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                formData={formData}
                setFormData={setFormData}
                bookedDates={bookedDates}
            />
            {formData.checkIn && formData.checkOut && (
                <div className="bg-gray-100 rounded px-3 py-2">
                    <strong className="text-gray-700">Total price:</strong>{" "}
                    <span className="text-gray-900">
                        {totalPrice}zł ({totalNights} night{totalNights > 1 ? "s" : ""} @ {pricePerNight}zł/night)
                    </span>
                </div>
            )}
            {error && <div className="text-red-600 font-medium">{error}</div>}
            <button
                onClick={handleBook}
                disabled={!formData.checkIn || !formData.checkOut || loading}
                className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors duration-200
                    ${(!formData.checkIn || !formData.checkOut || loading) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            >
                {loading ? "Booking..." : "Book"}
            </button>
        </div>
    );
}

export default CreateBookingForm;