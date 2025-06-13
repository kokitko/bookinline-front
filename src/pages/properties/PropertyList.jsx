import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProperties, fetchFilteredProperties } from '*/api/properties.js';

import Header from '*/components/Header';
import Footer from '*/components/Footer';
import PropertyCard from '*/components/PropertyCard.jsx';

function PropertyList() {
    const location = useLocation();
    const filter = location.state?.filter;

    const [data, setData] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        if (filter) {
            const response = fetchFilteredProperties(filter, 0, 12);
            response.then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                    setProperties(res.data.properties);
                } else {
                    console.error("Failed to fetch filtered properties");
                }
            }).catch((error) => {
                console.error("Error fetching filtered properties:", error);
            });
        } else {
            const response = fetchProperties(0, 12);
            response.then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                    setProperties(res.data.properties);
                } else {
                    console.error("Failed to fetch properties");
                }
            }).catch((error) => {
                console.error("Error fetching properties:", error);
            });
        }
    }, [filter]);

return (
    <>
            <Header />
            <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="container mx-auto px-4 py-8 text-center">
                            <h1 className="text-2xl font-bold mb-6">Available Properties</h1>
                            <div className="flex flex-row flex-wrap justify-center gap-4">
                                {properties.map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                    </div>
            </div>
            <Footer />
    </>
);
}

export default PropertyList;