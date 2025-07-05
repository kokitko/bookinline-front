import react, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '*/auth/AuthContext.jsx';
import { fetchPropertyDetails } from '*/api/properties.js';
import { fetchReviews } from '*/api/reviews.js';

import Header from '*/components/Header';
import Footer from '*/components/Footer';
import PropertyDetailsComponent from '*/components/PropertyDetailsComponent.jsx';

import CreateBookingForm from '*/components/CreateBookingForm.jsx';

function PropertyDetails() {
    const { id } = useParams();

    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [reviewsData, setReviewsData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [booking, setBooking] = useState(false);
    
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

            <PropertyDetailsComponent
                property={property}
                booking={(!user || user.role === 'GUEST') ? booking : true}
                setBooking={setBooking}
            />

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