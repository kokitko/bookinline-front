import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import ImageCard from '*/components/ImageCard.jsx';
import krakowImage from '*/assets/krakow.jpg';
import warsawImage from '*/assets/warsaw.jpg';
import houseImage from '*/assets/house.jpg';
import apartmentImage from '*/assets/apartment.jpg';
import villaImage from '*/assets/villa.jpg';
import loftImage from '*/assets/loft.jpg';
import { useNavigate } from 'react-router-dom';

import BookingDates from '*/components/booking/BookingDates.jsx';

function BookingForm() {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarButtonRef = React.useRef(null);
    const [isWideScreen, setIsWideScreen] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1000 : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        city: '',
        checkIn: '',
        checkOut: '',
        people: ''
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Form submitted:', formData);
        const filter = {
            city: (formData.city && formData.city.trim() !== '') ? formData.city.trim() : null,
            checkIn: (formData.checkIn !== '' ? formData.checkIn : null),
            checkOut: (formData.checkOut !== '' ? formData.checkOut : null),
            minGuests: (formData.people && formData.people > 0) ? parseInt(formData.people) : null
        };
        navigate('/search', { state: { filter } });
    }

    return (
        <>
            <div className="flex flex-row items-center p-4 justify-center gap-8">
                {isWideScreen && <ImageCard imageUrl={krakowImage} city="Krakow" />}
                <form
                    className="flex flex-col max-w-md p-4 bg-white shadow-2xl rounded mt-5"
                    style={{ minWidth: "350px" }}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="border p-2 w-full mb-4"
                        value={formData.city}
                        onChange={handleChange}
                    />
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
                    <input
                        type="number"
                        name="people"
                        placeholder="Number of People"
                        className="border p-2 w-full mb-4"
                        value={formData.people}
                        onChange={handleChange}
                        min={1}
                    />
                    <button type="submit" className="hover:bg-blue-500 bg-blue-600 text-white p-2 w-full cursor-pointer">Book Now</button>
                </form>
                {isWideScreen && <ImageCard imageUrl={warsawImage} city="Warsaw" />}
            </div>
            <BookingDates showCalendar={showCalendar} setShowCalendar={setShowCalendar} formData={formData} setFormData={setFormData} />
            {isWideScreen ? <div className="flex flex-row items-center p-4 justify-center gap-8">
                <ImageCard imageUrl={houseImage} propertyType="House" />
                <ImageCard imageUrl={apartmentImage} propertyType="Apartment" />
                <ImageCard imageUrl={villaImage} propertyType="Villa" />
                <ImageCard imageUrl={loftImage} propertyType="Loft" />
            </div> : <div className="flex flex-col items-center p-4 justify-center gap-8">
                <ImageCard imageUrl={houseImage} propertyType="House" />
                <ImageCard imageUrl={apartmentImage} propertyType="Apartment" />
            </div>}
        </>
    );
}

export default BookingForm;