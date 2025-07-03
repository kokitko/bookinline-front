import React, { useState } from 'react';
import { fetchLeaveReview } from '../api/reviews.js';
import { useNavigate } from 'react-router-dom';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <svg
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={filled ? "#fbbf24" : "none"}
        stroke="#fbbf24"
        className="w-9 h-9 cursor-pointer transition"
    >
        <polygon
            strokeWidth="1.5"
            points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36"
        />
    </svg>
);

const LeaveReviewForm = ({ propertyId }) => {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetchLeaveReview(propertyId, { rating, comment });
            if (response.status === 200) {
                navigate('/property/' + propertyId);
            }
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-lg px-6 py-6 flex flex-col gap-3 border border-gray-200 mt-5
                    md:mt-8 md:px-10 md:py-8"
        >
            <label className="text-lg font-semibold text-gray-800">Rating</label>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        filled={hoverRating ? star <= hoverRating : star <= rating}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    />
                ))}
            </div>
            <label className="text-lg font-semibold text-gray-800" htmlFor="comment">
                Description
            </label>
            <textarea
                id="comment"
                className="border border-blue-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700
                        placeholder-gray-400 transition w-full resize-none min-h-[4rem] max-h-40 leading-relaxed"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                placeholder="Share your experience..."
                maxLength={240}
                rows={4}
                wrap="soft"
            />
            <div className="text-right text-xs text-gray-400">{comment.length}/240</div>
            <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition disabled:opacity-60
                        w-full md:w-auto md:self-end cursor-pointer"
            >
                {loading ? 'Submitting...' : 'Leave Review'}
            </button>
        </form>
    );
};

export default LeaveReviewForm;