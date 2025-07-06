
import { fetchAllReviews, deleteReview } from '*/api/admin.js';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export default function ReviewsManagementContent() {
    const [reviewsData, setReviewsData] = useState({
        page: 0,
        size: PAGE_SIZE,
        totalPages: 0,
        totalElements: 0,
        last: true,
        reviews: [],
    });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const fetchReviews = async (pageNum = 0) => {
        setLoading(true);
        try {
            const response = await fetchAllReviews(pageNum, PAGE_SIZE);
            setReviewsData(response.data);
        } catch (e) {
            // handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews(page);
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            await deleteReview(id);
            fetchReviews(page);
        } catch (e) {
            // handle error
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reviews Management</h1>
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border rounded-lg shadow">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">ID</th>
                                    <th className="p-2 text-left">Author</th>
                                    <th className="p-2 text-left">Rating</th>
                                    <th className="p-2 text-left">Comment</th>
                                    <th className="p-2 text-left">Created At</th>
                                    <th className="p-2 text-left">Property</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviewsData.reviews.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center p-4">
                                            No reviews found.
                                        </td>
                                    </tr>
                                ) : (
                                    reviewsData.reviews.map((review) => (
                                        <tr key={review.id} className="border-t">
                                            <td className="p-2">{review.id}</td>
                                            <td className="p-2">{review.authorName}</td>
                                            <td className="p-2">{review.rating}</td>
                                            <td className="p-2 max-w-xs truncate">{review.comment}</td>
                                            <td className="p-2">
                                                {new Date(review.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    className="text-blue-600 underline cursor-pointer"
                                                    onClick={() => navigate(`/property/${review.propertyId}`)}
                                                >
                                                    Visit
                                                </button>
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                                                    onClick={() => handleDelete(review.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={reviewsData.page === 0}
                        >
                            Previous
                        </button>
                        <span>
                            Page {reviewsData.page + 1} of {reviewsData.totalPages}
                        </span>
                        <button
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={reviewsData.last}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}