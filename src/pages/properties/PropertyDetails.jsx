import react, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImage } from '*/api/images.js';
import { fetchPropertyDetails } from '*/api/properties.js';
import { fetchReviews } from '*/api/reviews.js';

import Header from '*/components/Header';
import Footer from '*/components/Footer';
import ArrowRight from '*/assets/arrow_right.svg';
import ArrowLeft from '*/assets/arrow_left.svg';

import CreateBookingForm from '*/components/CreateBookingForm.jsx';

function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [reviewsData, setReviewsData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [booking, setBooking] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const response = fetchPropertyDetails(id);
        response.then((res) => {
            if (res.status === 200) {
                setProperty(res.data);
            } else {
                console.error("Failed to fetch property details");
            }
        }).catch((error) => {
            console.error("Error fetching property details:", error);
        });
    }, [id]);

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

    const handlePrev = () => {
        if (!property?.imageUrls) return;
        setCurrentIndex((prev) => 
            prev === 0 ? property.imageUrls.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (property) {
            const response = fetchReviews(property.id, 0, 10);
            response.then((res) => {
                if (res.status === 200) {
                    setReviewsData(res.data);
                    setReviews(res.data.reviews);
                } else {
                    console.error("Failed to fetch reviews");
                }
            }).catch((error) => {
                console.error("Error fetching reviews:", error);
            });
        }
    }, [property])

    const handleNext = () => {
        if (!property?.imageUrls) return;
        setCurrentIndex((prev) => 
            prev === property.imageUrls.length - 1 ? 0 : prev + 1
        );
    };

    const handleBookNow = () => {
        setBooking(true);
    }

    // Pagination state for reviews
    const [reviewPage, setReviewPage] = useState(0);
    const [isLastReviewPage, setIsLastReviewPage] = useState(true);
    const REVIEWS_PAGE_SIZE = 10;

    useEffect(() => {
        if (property) {
            fetchReviews(property.id, reviewPage, REVIEWS_PAGE_SIZE)
                .then((res) => {
                    if (res.status === 200) {
                        setReviewsData(res.data);
                        setReviews(res.data.reviews);
                        setIsLastReviewPage(res.data.last);
                    } else {
                        console.error("Failed to fetch reviews");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching reviews:", error);
                });
        }
    }, [property, reviewPage]);

    useEffect(() => {
        setReviewPage(0);
    }, [property]);

    const handleNextReviewPage = () => {
        if (!isLastReviewPage) setReviewPage((prev) => prev + 1);
    };

    const handlePrevReviewPage = () => {
        if (reviewPage > 0) setReviewPage((prev) => prev - 1);
    };

return (
    <>
        <Header />
        <div className="flex flex-col items-center min-h-screen bg-white-100">
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

            {booking && <CreateBookingForm pricePerNight={property?.pricePerNight}
                                            propertyId={property?.id}
            />}

            <div className="w-full max-w-3xl mt-10 bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Property reviews</h3>
                {reviews.length === 0 ? (
                    <span className="text-gray-500">No reviews yet.</span>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {reviews.map((review, index) => (
                                <li key={review.id || index} className="border-b pb-3 last:border-b-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-700">{review.authorName}</span>
                                        <span className="text-yellow-500">★ {review.rating}</span>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={handlePrevReviewPage}
                                disabled={reviewPage === 0}
                                className={`px-3 py-1 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Previous
                            </button>
                            <span className="text-gray-500 text-sm">
                                Page {reviewPage + 1} of {reviewsData?.totalPages || 1}
                            </span>
                            <button
                                onClick={handleNextReviewPage}
                                disabled={isLastReviewPage}
                                className={`px-3 py-1 rounded bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
        <Footer />
    </>
)
}

export default PropertyDetails;