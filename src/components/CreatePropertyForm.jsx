import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateProperty } from "../api/properties.js";

const initialState = {
    title: "",
    description: "",
    city: "",
    propertyType: "",
    floorArea: "",
    bedrooms: "",
    address: "",
    pricePerNight: "",
    maxGuests: "",
};

const PROPERTY_TYPES = [
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

const validate = (fields) => {
    const errors = {};
    if (!fields.title.trim()) errors.title = "Title is required";
    if (!fields.description.trim()) errors.description = "Description is required";
    if (!fields.city.trim()) errors.city = "City is required";
    if (!fields.propertyType.trim()) errors.propertyType = "Property type is required";
    if (!fields.floorArea || isNaN(fields.floorArea) || fields.floorArea <= 0)
        errors.floorArea = "Floor area must be a positive number";
    if (!fields.bedrooms || isNaN(fields.bedrooms) || fields.bedrooms <= 0)
        errors.bedrooms = "Number of bedrooms must be a positive number";
    if (!fields.address.trim()) errors.address = "Address is required";
    if (!fields.pricePerNight || isNaN(fields.pricePerNight) || fields.pricePerNight <= 0)
        errors.pricePerNight = "Price per night must be a positive number";
    if (!fields.maxGuests || isNaN(fields.maxGuests) || fields.maxGuests <= 0)
        errors.maxGuests = "Max guests must be a positive number";
    return errors;
};

function CreatePropertyForm() {
    const [fields, setFields] = useState(initialState);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleRemoveImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(fields);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setSubmitting(true);
        try {
            const propertyData = {
                ...fields,
                floorArea: Number(fields.floorArea),
                bedrooms: Number(fields.bedrooms),
                pricePerNight: Number(fields.pricePerNight),
                maxGuests: Number(fields.maxGuests),
            };
            const response = await fetchCreateProperty(propertyData, images);
            if (response?.data?.id) {
                navigate(`/property/${response.data.id}`);
            }
        } catch (err) {
            setErrors({ submit: "Failed to create property. Please try again." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl space-y-6 border border-gray-100 mt-8"
            onSubmit={handleSubmit}
            noValidate
        >
            <h2 className="text-3xl font-bold text-center mb-5">Create Property</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(initialState).map(([key, _]) => (
                    key === "propertyType" ? (
                        <div key={key} className="flex flex-col">
                            <label className="block font-semibold mb-1 capitalize text-gray-700" htmlFor={key}>
                                Property Type
                            </label>
                            <select
                                id={key}
                                name={key}
                                className={`w-full border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                                    ${errors[key] ? "border-red-400" : "border-gray-300"}`}
                                value={fields[key]}
                                onChange={handleChange}
                            >
                                <option value="">Select type...</option>
                                {PROPERTY_TYPES.map(type => (
                                    <option key={type} value={type}>{type.charAt(0) + type.slice(1).toLowerCase()}</option>
                                ))}
                            </select>
                            {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                        </div>
                    ) : (
                        <div key={key} className="flex flex-col">
                            <label className="block font-semibold mb-1 capitalize text-gray-700" htmlFor={key}>
                                {key.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                id={key}
                                name={key}
                                type={
                                    ["floorArea", "bedrooms", "pricePerNight", "maxGuests"].includes(key)
                                        ? "number"
                                        : "text"
                                }
                                className={`w-full border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                                    ${errors[key] ? "border-red-400" : "border-gray-300"}`}
                                value={fields[key]}
                                onChange={handleChange}
                                min={["floorArea", "bedrooms", "pricePerNight", "maxGuests"].includes(key) ? 1 : undefined}
                                step={key === "pricePerNight" ? "0.01" : "1"}
                            />
                            {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                        </div>
                    )
                ))}
            </div>
            <div>
                <label className="block font-semibold mb-2 text-gray-700">Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={img.name}
                                    className="w-full h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition group-hover:scale-110"
                                    title="Remove"
                                >
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="absolute bottom-1 left-1 bg-white bg-opacity-70 rounded px-2 py-0.5 text-xs text-gray-700 truncate max-w-[90%]">
                                    {img.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {errors.submit && <p className="text-red-500 text-center">{errors.submit}</p>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                disabled={submitting}
            >
                {submitting ? "Creating..." : "Create Property"}
            </button>
        </form>
    );
}

export default CreatePropertyForm;