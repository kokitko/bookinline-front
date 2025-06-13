import React, { useEffect, useState } from 'react';

import ImageCard from './ImageCard.jsx';
import krakowImage from '../assets/krakow.jpg';
import warsawImage from '../assets/warsaw.jpg';
import houseImage from '../assets/house.jpg';
import apartmentImage from '../assets/apartment.jpg';
import villaImage from '../assets/villa.jpg';
import loftImage from '../assets/loft.jpg';
import { useNavigate } from 'react-router-dom';

function BookingForm() {

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
        const filter = {
            city: formData.city,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            people: formData.people
        };
        navigate('/search', { state: { filter } });
    }

    return (<>
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
                <input
                    type="date"
                    name="checkIn"
                    placeholder="Check-in"
                    className="border p-2 w-full mb-4"
                    value={formData.checkIn}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="checkOut"
                    placeholder="Check-out"
                    className="border p-2 w-full mb-4"
                    value={formData.checkOut}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="people"
                    placeholder="Number of People"
                    className="border p-2 w-full mb-4"
                    value={formData.people}
                    onChange={handleChange}
                />
                <button type="submit" className="hover:bg-blue-500 bg-blue-600 text-white p-2 w-full cursor-pointer">Book Now</button>    
            </form>
            {isWideScreen && <ImageCard imageUrl={warsawImage} city="Warsaw" />}
        </div>
        {isWideScreen ? <div className="flex flex-row items-center p-4 justify-center gap-8">
            <ImageCard imageUrl={houseImage} propertyType="House" />
            <ImageCard imageUrl={apartmentImage} propertyType="Apartment" />
            <ImageCard imageUrl={villaImage} propertyType="Villa" />
            <ImageCard imageUrl={loftImage} propertyType="Loft" />
        </div> : <div className="flex flex-col items-center p-4 justify-center gap-8">
            <ImageCard imageUrl={houseImage} propertyType="House" />
            <ImageCard imageUrl={apartmentImage} propertyType="Apartment" />
        </div>}
    </>);
}

export default BookingForm;