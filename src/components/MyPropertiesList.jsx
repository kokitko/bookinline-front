
import { fetchMyProperties } from "../api/properties.js";
import { fetchImage } from "../api/images.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await fetchMyProperties(page, PAGE_SIZE);
                setProperties(response.data.properties);
                setTotalPages(response.data.totalPages);
                const urls = {};
                await Promise.all(
                    response.data.properties.map(async (property) => {
                        if (property.imageUrls && property.imageUrls.length > 0) {
                            try {
                                const imgUrl = await fetchImage(property.imageUrls[0]);
                                urls[property.id] = imgUrl;
                            } catch {
                                urls[property.id] = null;
                            }
                        }
                    })
                );
                setImageUrls(urls);
            } catch (err) {
                setProperties([]);
            }
            setLoading(false);
        };
        fetchProperties();
    }, [page]);

    const handleEdit = (id) => {
    };

    const handleDelete = (id) => {
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Properties</h2>
            {loading ? (
            <div className="text-center py-8">Loading...</div>
            ) : properties.length === 0 ? (
            <div className="text-center py-8">No properties found.</div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                >
                    <div className="md:w-1/3 w-full h-48 md:h-auto bg-gray-100 flex items-center justify-center">
                    {imageUrls[property.id] ? (
                        <Link to={`/property/${property.id}`} >
                        <img
                            src={imageUrls[property.id]}
                            alt={property.title}
                            className="object-cover w-full h-full"
                        />
                        </Link>
                    ) : (
                        <div className="text-gray-400">No Image</div>
                    )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <Link to={`/property/${property.id}`}><h3 className="text-lg font-semibold">{property.title}</h3></Link>
                        <p className="text-gray-600 text-sm mb-2">{property.city} • {property.propertyType}</p>
                        <p className="text-gray-700 mb-2">{property.description}</p>
                        <div className="text-xs text-gray-500 mb-1">
                        {property.bedrooms} bedrooms • {property.floorArea} m² • Max {property.maxGuests} guests
                        </div>
                        <div className="text-sm font-medium text-green-600 mb-1">
                        {property.pricePerNight}zł / night
                        </div>
                        <div className="text-xs text-yellow-500">
                        Rating: {property.averageRating ?? "N/A"}
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                        onClick={() => handleEdit(property.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(property.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
            <div className="flex justify-center mt-6 gap-2">
            <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-3 py-1">{page + 1} / {totalPages || 1}</span>
            <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
            </div>
        </div>
        );
}
