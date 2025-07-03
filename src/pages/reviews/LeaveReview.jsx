import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchPropertyDetails } from '*/api/properties.js';
import { fetchHasReview } from '*/api/reviews.js';

import Header from '*/components/Header';
import PropertyDetailsComponent from '*/components/PropertyDetailsComponent';
import LeaveReviewForm from '*/components/LeaveReviewForm';
import Footer from '*/components/Footer';

function LeaveReview() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();

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
        const checkReviewStatus = async () => {
            try {
                const response = await fetchHasReview(id);
                if (response.status === 200 && response.data) {
                    navigate("/property/" + id);
                }
            } catch (error) {
                throw error;
            }
        };
        checkReviewStatus();
    }, [id]);

    return (
        <>
            <Header />
            <div className="flex flex-col items-center min-h-screen bg-white-100">
                <PropertyDetailsComponent property={property} booking={true} />
                <LeaveReviewForm propertyId={id} />
            </div>
            <Footer />
        </>
    )
}

export default LeaveReview;