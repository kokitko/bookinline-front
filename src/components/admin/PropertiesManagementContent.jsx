import React, { useEffect, useState } from "react";
import { fetchAllProperties, fetchPropertiesByType, changePropertyAvailability } from '*/api/admin.js';
import { fetchImage } from '*/api/images.js';
import { useNavigate } from "react-router-dom";

const PROPERTY_TYPES = [
    "ANY",
    "APARTMENT",
    "HOUSE",
    "VILLA",
    "STUDIO",
    "CABIN",
    "COTTAGE",
    "LOFT",
    "BUNGALOW",
    "TOWNHOUSE",
    "FARMHOUSE"
];

const PAGE_SIZE = 8;

export default function PropertiesManagementContent() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("ANY");
    const [imgUrls, setImgUrls] = useState({});
    const [actionLoading, setActionLoading] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");
        const fetchFn = type === "ANY"
            ? fetchAllProperties(page, PAGE_SIZE)
            : fetchPropertiesByType(type, page, PAGE_SIZE);
        fetchFn
            .then(res => {
                setProperties(res.data.properties);
                setTotalPages(res.data.totalPages);
            })
            .catch(() => setError("Failed to fetch properties."))
            .finally(() => setLoading(false));
    }, [type, page]);

    useEffect(() => {
        setImgUrls({});
        properties.forEach(async (prop) => {
            if (prop.imageUrls && prop.imageUrls.length > 0) {
                try {
                    const res = await fetchImage(prop.imageUrls[0]);
                    setImgUrls(prev => ({ ...prev, [prop.id]: res }));
                } catch {
                    setImgUrls(prev => ({ ...prev, [prop.id]: null }));
                }
            } else {
                setImgUrls(prev => ({ ...prev, [prop.id]: null }));
            }
        });
    }, [properties]);

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setPage(0);
    };

    const handleAvailability = async (propertyId, available) => {
        if (!window.confirm(`Are you sure you want to ${available ? "close" : "open"} this property?`)) return;
        setActionLoading(propertyId);
        setMessage("");
        setError("");
        try {
            await changePropertyAvailability(propertyId);
            setMessage(`Property has been ${available ? "closed" : "opened"} successfully.`);
            const fetchFn = type === "ANY"
                ? fetchAllProperties(page, PAGE_SIZE)
                : fetchPropertiesByType(type, page, PAGE_SIZE);
            const res = await fetchFn;
            setProperties(res.data.properties);
            setTotalPages(res.data.totalPages);
        } catch {
            setError("Failed to change property availability.");
        }
        setActionLoading(null);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Properties Management</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <label className="font-semibold text-gray-700" htmlFor="type-select">
                    Property Type:
                </label>
                <select
                    id="type-select"
                    value={type}
                    onChange={handleTypeChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
                >
                    {PROPERTY_TYPES.map(t => (
                        <option key={t} value={t === "ANY" ? "ANY" : t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                    ))}
                </select>
            </div>
            {message && (
                <div className="mb-4 text-green-700 bg-green-100 rounded px-4 py-2 text-center">{message}</div>
            )}
            {error && (
                <div className="mb-4 text-red-700 bg-red-100 rounded px-4 py-2 text-center">{error}</div>
            )}
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : properties.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No properties found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((prop) => (
                        <div key={prop.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                            <div className="relative mb-3">
                                {imgUrls[prop.id] ? (
                                    <img
                                        src={imgUrls[prop.id]}
                                        alt={prop.title}
                                        className="w-full h-40 object-cover rounded-lg border"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg border text-gray-400">
                                        No image
                                    </div>
                                )}
                                <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold
                                    ${prop.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {prop.available ? "Available" : "Closed"}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-lg mb-1">{prop.title}</div>
                                <div className="text-gray-600 mb-1">{prop.city}</div>
                                <div className="text-gray-500 text-sm mb-1">{prop.propertyType}</div>
                                <div className="text-gray-500 text-sm mb-1">Address: {prop.address}</div>
                                <div className="text-gray-500 text-sm mb-1">Bedrooms: {prop.bedrooms}, Floor area: {prop.floorArea} m²</div>
                                <div className="text-gray-500 text-sm mb-1">Max guests: {prop.maxGuests}</div>
                                <div className="text-gray-500 text-sm mb-1">Price/night: <span className="font-semibold">{prop.pricePerNight} zł</span></div>
                                <div className="text-gray-500 text-sm mb-1">Avg. rating: {prop.averageRating ?? "N/A"}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                                    onClick={() => navigate(`/property/${prop.id}`)}
                                >
                                    Details
                                </button>
                                <button
                                    className={`flex-1 px-4 py-2 rounded transition font-semibold cursor-pointer
                                        ${prop.available
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                        }`}
                                    disabled={actionLoading === prop.id}
                                    onClick={() => handleAvailability(prop.id, prop.available)}
                                >
                                    {actionLoading === prop.id
                                        ? "Processing..."
                                        : prop.available ? "Close" : "Open"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span className="px-3 py-1 text-gray-700">
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}