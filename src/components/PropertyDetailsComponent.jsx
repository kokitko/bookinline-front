import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchImage } from '*/api/images.js';
import { useAuth } from '*/auth/AuthContext.jsx';

import ArrowRight from '*/assets/arrow_right.svg';
import ArrowLeft from '*/assets/arrow_left.svg';

function PropertyDetailsComponent({ property, booking, setBooking }) {
    const navigate = useNavigate();
    const { user } = useAuth(); 
    const [imageSrc, setImageSrc] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (!property?.imageUrls) return;
        setCurrentIndex((prev) => 
            prev === 0 ? property.imageUrls.length - 1 : prev - 1
        );
    };
    
    const handleNext = () => {
        if (!property?.imageUrls) return;
        setCurrentIndex((prev) => 
            prev === property.imageUrls.length - 1 ? 0 : prev + 1
        );
    };

    const handleBookNow = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        setBooking(true);
    }

    useEffect(() => {
        let isMounted = true;
        if (property && property.imageUrls && property.imageUrls.length > 0) {
            fetchImage(property.imageUrls[currentIndex])
                .then(url => {
                    if (isMounted && url) setImageSrc(url);
                })
                .catch(() => setImageSrc(null));
        } else {
            setImageSrc(null);
        }
        return () => { isMounted = false; }
    }, [property, currentIndex]);

    return (<>
            {property ? (
                <div className="
                    flex flex-col md:flex-row items-center justify-center
                    w-full max-w-4xl p-2 md:p-6
                    rounded-lg gap-8 bg-white shadow-lg mt-8
                ">
                    <div className="relative w-full max-w-2xl aspect-video bg-gray-200 flex items-center justify-center mb-6 rounded-lg overflow-hidden shadow">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={`Property image ${currentIndex + 1}`}
                                className="object-cover w-full h-full transition-all duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                                No image available
                            </div>
                        )}

                        {property?.imageUrls?.length > 1 && (
                            <>
                                {/* Previous button */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-blue-100 transition"
                                >
                                    <img src={ArrowLeft} style={{scale: 1.2}} alt="arrow left" className="w-5 h-5" />
                                </button>
                                {/* Next button */}
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-blue-100 transition"
                                >
                                    <img src={ArrowRight} style={{scale: 1.2}} alt="arrow right" className="w-5 h-5" />
                                </button>
                                {/* Image index indicator */}
                                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
                                    {currentIndex + 1} / {property.imageUrls.length}
                                </span>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{property.title}</h2>
                        <p className="text-gray-600 mb-2">{property.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                            <span className="bg-blue-50 px-2 py-1 rounded">City: {property.city}</span>
                            <span className="bg-blue-50 px-2 py-1 rounded">Address: {property.address}</span>
                            <span className="bg-blue-50 px-2 py-1 rounded">Area: {property.floorArea} m²</span>
                            <span className="bg-blue-50 px-2 py-1 rounded">Bedrooms: {property.bedrooms}</span>
                            <span className="bg-blue-50 px-2 py-1 rounded">Guests: {property.maxGuests}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-lg font-semibold text-green-700">
                                {property.pricePerNight}zł. <span className="text-sm text-gray-500">/ night</span>
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500 font-medium">
                                ★ {(property.averageRating > 0) ? property.averageRating : "N/A"}
                            </span>
                            {!booking && <button onClick={handleBookNow} 
                                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
                                Book Now
                            </button>}
                        </div>
                    </div>
                </div>
            ) : (
                <span className="mt-10 text-gray-500 text-lg">Loading property details...</span>
            )}
    </>)
}

export default PropertyDetailsComponent;