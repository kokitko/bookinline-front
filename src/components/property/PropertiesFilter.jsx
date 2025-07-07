import React, { useState } from "react";
import PropTypes from "prop-types";
import BookingDates from "*/components/booking/BookingDates.jsx";

const propertyTypes = [
    { value: "", label: "Any" },
    { value: "APARTMENT", label: "Apartment" },
    { value: "HOUSE", label: "House" },
    { value: "VILLA", label: "Villa" },
    { value: "STUDIO", label: "Studio" },
    { value: "CABIN", label: "Cabin" },
    { value: "COTTAGE", label: "Cottage" },
    { value: "LOFT", label: "Loft" },
    { value: "BUNGALOW", label: "Bungalow" },
    { value: "TOWNHOUSE", label: "Townhouse" },
    { value: "FARMHOUSE", label: "Farmhouse" },
];

const sortOptions = [
    { value: "", label: "Default" },
    { value: "pricePerNight", label: "Price" },
    { value: "averageRating", label: "Rating" },
];

const sortOrderOptions = [
    { value: "", label: "Default" },
    { value: "ASC", label: "Ascending" },
    { value: "DESC", label: "Descending" },
];

const PropertiesFilter = ({ setFiltersMain, setPage, setSize }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [formData, setFormData] = useState({
        checkIn: null,
        checkOut: null,
    });
    const calendarButtonRef = React.useRef(null);
    const [filters, setFilters] = useState({
        checkIn: "",
        checkOut: "",
        title: "",
        city: "",
        propertyType: "",
        minFloorArea: "",
        maxFloorArea: "",
        minBedrooms: "",
        maxBedrooms: "",
        address: "",
        minPrice: "",
        maxPrice: "",
        minGuests: "",
        maxGuests: "",
        minRating: "",
        maxRating: "",
        sortBy: "",
        sortOrder: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const filterObj = {
            ...filters,
            checkIn: formData.checkIn || filters.checkIn,
            checkOut: formData.checkOut || filters.checkOut,
        };
        const body = Object.fromEntries(
            Object.entries(filterObj).filter(
                ([, v]) => v !== "" && v !== null && v !== undefined
            )
        );
        setFiltersMain(body);
        setPage(0);
        setSize(12);

        setFormData({
            checkIn: null,
            checkOut: null,
        });
        setShowCalendar(false);
    };

    return (
    <form
        className="properties-filter mx-auto w-full max-w-3xl bg-white rounded-lg shadow-md px-6 py-6 flex flex-col gap-6"
        onSubmit={handleSearch}
    >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={filters.title}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="city"
                placeholder="City"
                value={filters.city}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={filters.address}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {propertyTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                        {t.label}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
                <div
                    ref={calendarButtonRef}
                    className="border border-gray-300 rounded px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition text-gray-700"
                    onClick={() => setShowCalendar(true)}
                >
                    {formData.checkIn && formData.checkOut
                        ? `${formData.checkIn} — ${formData.checkOut}`
                        : "Select dates"}
                </div>
                <BookingDates
                    showCalendar={showCalendar}
                    setShowCalendar={setShowCalendar}
                    formData={formData}
                    setFormData={setFormData}
                />
            </div>
            <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                min={0}
                value={filters.minPrice}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                min={0}
                value={filters.maxPrice}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
                <input
                    type="number"
                    name="minGuests"
                    placeholder="Min Guests"
                    min={0}
                    value={filters.minGuests}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    name="maxGuests"
                    placeholder="Max Guests"
                    min={0}
                    value={filters.maxGuests}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input
                type="number"
                name="minBedrooms"
                placeholder="Min Bedrooms"
                min={0}
                value={filters.minBedrooms}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="maxBedrooms"
                placeholder="Max Bedrooms"
                min={0}
                value={filters.maxBedrooms}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="minFloorArea"
                placeholder="Min Area"
                min={0}
                value={filters.minFloorArea}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="maxFloorArea"
                placeholder="Max Area"
                min={0}
                value={filters.maxFloorArea}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="minRating"
                placeholder="Min Rating"
                min={0}
                max={5}
                step={0.1}
                value={filters.minRating}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="number"
                name="maxRating"
                placeholder="Max Rating"
                min={0}
                max={5}
                step={0.1}
                value={filters.maxRating}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
            <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {sortOrderOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition font-semibold cursor-pointer"
            >
                Search
            </button>
        </div>
    </form>
    );
};

PropertiesFilter.propTypes = {
    onResults: PropTypes.func,
    page: PropTypes.number,
    size: PropTypes.number,
};

export default PropertiesFilter;