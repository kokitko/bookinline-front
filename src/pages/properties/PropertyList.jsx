import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProperties, fetchFilteredProperties } from '*/api/properties.js';

import Header from '*/components/Header';
import Footer from '*/components/Footer';
import PropertyCard from '*/components/PropertyCard.jsx';

function PropertyList() {
    const location = useLocation();
    const filter = location.state?.filter;

    const [data, setData] = useState({});
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);

    useEffect(() => {
        let response;
        if (filter) {
            response = fetchFilteredProperties(filter, page, size);
        } else {
            response = fetchProperties(page, size);
        }
        response.then((res) => {
            if (res.status === 200) {
                setData(res.data);
                setProperties(res.data.properties);
            } else {
                setProperties([]);
                console.error("Failed to fetch properties");
            }
        }).catch((error) => {
            setProperties([]);
            console.error("Error fetching properties:", error);
        });
    }, [filter, page]);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (data && !data.last && properties.length === 12) setPage(page + 1);
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="container mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold mb-6">Available Properties</h1>
                    <div className="flex flex-row flex-wrap justify-center gap-4 mb-6">
                        {properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={page === 0}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                        >
                            Previous
                        </button>
                        <span className="px-2 py-2 text-gray-700">Page {page + 1}</span>
                        <button
                            onClick={handleNext}
                            disabled={properties.length < 12}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PropertyList;