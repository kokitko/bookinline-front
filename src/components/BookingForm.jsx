import React, { useEffect, useState } from 'react';

import ImageCard from './ImageCard.jsx';
import krakowImage from '../assets/krakow.jpg';
import warsawImage from '../assets/warsaw.jpg';

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

    return (
        <div className="flex flex-row items-center p-4 justify-center gap-8">
            {isWideScreen && <ImageCard imageUrl={krakowImage} city="Krakow" />}
            <form className="flex flex-col max-w-md p-4 bg-white shadow-2xl rounded mt-5"
                  style={{ minWidth: "350px" }}>
                <input type="text" placeholder="City" className="border p-2 w-full mb-4" />
                <input type="date" placeholder="Check-in" className="border p-2 w-full mb-4" />
                <input type="date" placeholder="Check-out" className="border p-2 w-full mb-4" />
                <input type="number" placeholder="Number of People" className="border p-2 w-full mb-4" />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Book Now</button>    
            </form>
            {isWideScreen && <ImageCard imageUrl={warsawImage} city="Warsaw" />}
        </div>
    )
}

export default BookingForm;