import { fetchUserReviews } from '*/api/reviews.js';
import { useState, useEffect } from 'react';
import { useAuth } from '*/auth/AuthContext.jsx';
import { fetchPropertyDetails } from '*/api/properties.js';
import { fetchDeleteReview } from '*/api/reviews.js';
import PropertyCard from '*/components/property/PropertyCard.jsx';

function MyReviewsList() {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [properties, setProperties] = useState({});
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (!user?.id) return;
        const fetchReviews = async () => {
            try {
                const response = await fetchUserReviews(user.id, page, size);
                if (response.status === 200) {
                    setReviews(response.data.reviews);
                    setTotalPages(response.data.totalPages);
                } else {
                    setReviews([]);
                    setTotalPages(0);
                }
            } catch (error) {
                setReviews([]);
                setTotalPages(0);
            }
        };
        fetchReviews();
    }, [user, page, size]);

    useEffect(() => {
        const fetchAllProperties = async () => {
            const ids = reviews.map(r => r.propertyId).filter(Boolean);
            const uniqueIds = [...new Set(ids)];
            const newProperties = {};
            await Promise.all(uniqueIds.map(async id => {
                if (!properties[id]) {
                    try {
                        const res = await fetchPropertyDetails(id);
                        if (res.status === 200) {
                            newProperties[id] = res.data;
                        }
                    } catch {}
                }
            }));
            if (Object.keys(newProperties).length > 0) {
                setProperties(prev => ({ ...prev, ...newProperties }));
            }
        };
        if (reviews.length > 0) fetchAllProperties();
    }, [reviews]);

    const handleDelete = async (reviewId) => {
        setDeleting(reviewId);
        try {
            const confirmed = window.confirm('Are you sure you want to delete this review?');
            if (!confirmed) {
                setDeleting(null);
                return;
            }
            const res = await fetchDeleteReview(reviewId);
            if (res.status === 204) {
                setReviews(reviews => reviews.filter(r => r.id !== reviewId));
            }
        } catch {}
        setDeleting(null);
    };

    return (
        <div className="flex flex-col items-center w-full mt-5">
            <div className="flex flex-wrap justify-center gap-6 w-full">
                {reviews.map(review => (
                    <div
                        key={review.id}
                        className="w-[330px] h-[500px] bg-white rounded-lg shadow p-4 flex flex-col mb-4 items-center justify-center"
                    >
                        {review.propertyId && properties[review.propertyId] ? (
                            <PropertyCard property={properties[review.propertyId]} />
                        ) : (
                            <div className="h-40 flex items-center justify-center w-full">Loading property...</div>
                        )}
                        <div className="mt-4 flex flex-col flex-1 items-center justify-center w-full">
                            <div className="flex items-center gap-2 justify-center w-full">
                                <span className="font-semibold">Rating:</span>
                                <span>{review.rating}/5</span>
                            </div>
                            <div
                                className="text-gray-600 mt-2 break-words overflow-y-auto text-center w-full"
                                style={{
                                    minHeight: '64px',
                                    maxHeight: '96px',
                                    wordBreak: 'break-word'
                                }}
                            >
                                {review.comment}
                            </div>
                            <div className="text-xs text-gray-400 mt-2 mb-2 text-center w-full">
                                {new Date(review.createdAt).toLocaleString()}
                            </div>
                        </div>
                        <button
                            className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 mt-auto cursor-pointer"
                            onClick={() => handleDelete(review.id)}
                            disabled={deleting === review.id}
                        >
                            {deleting === review.id ? 'Deleting...' : 'Delete Review'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4 justify-center items-center w-full">
                <button
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Prev
                </button>
                <span className="self-center">{page + 1} / {totalPages}</span>
                <button
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default MyReviewsList;
