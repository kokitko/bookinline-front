import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchImage } from '*/api/images.js';

import noimage from '*/assets/noimage.jpg';

function PropertyCard({ property }) {
    if (!property) return null;

    const [imageSrc, setImageSrc] = useState(noimage);

    useEffect(() => {
        let isMounted = true;
        if (property && property.imageUrls && property.imageUrls.length > 0) {
            fetchImage(property.imageUrls[0])
                .then(url => {
                    if (isMounted && url) setImageSrc(url);
                })
                .catch(() => setImageSrc(noimage));
        } else {
            setImageSrc(noimage);
        }
        return () => { isMounted = false; }
    }, [property]);

    return (
        <Link
            to={`/property/${property.id}`}
            className="flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            style={{ minWidth: "300px", maxWidth: "300px", textDecoration: "none" }}
        >
            <img
                src={imageSrc}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <h3>{property.title}</h3>
            <p>{property.city}, {property.address}</p>
            <span className="flex items-center gap-1 text-yellow-500 font-medium">
                ★ {(property.averageRating > 0) ? property.averageRating : "N/A"}
            </span>
        </Link>
    );
}

export default PropertyCard;