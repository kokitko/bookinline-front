import React from "react";
import { Link } from "react-router-dom";

const AdminDashboardContent = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white min-h-[80vh] rounded-2xl shadow-lg">
            <div className="bg-white rounded-2xl shadow p-10 mb-10 flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
                    Welcome, Admin!
                </h1>
                <p className="text-gray-500 text-lg mb-2 text-center">
                    Use the dashboard below to manage your platform efficiently.
                </p>
                <div className="w-16 h-1 bg-blue-200 rounded-full mt-2 mb-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Link to="/admin/users">
                    <button className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer w-full">
                        <span className="text-2xl mb-2">👤</span>
                        <span className="text-lg">Manage Users</span>
                    </button>
                </Link>
                <Link to="/admin/properties">
                    <button className="flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200 cursor-pointer w-full">
                        <span className="text-2xl mb-2">🏠</span>
                        <span className="text-lg">Manage Properties</span>
                    </button>
                </Link>
                <Link to="/admin/bookings">
                    <button className="flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 cursor-pointer w-full">
                        <span className="text-2xl mb-2">📅</span>
                        <span className="text-lg">Manage Bookings</span>
                    </button>
                </Link>
                <Link to="/admin/reviews">
                    <button className="flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-200 cursor-pointer w-full">
                        <span className="text-2xl mb-2">⭐</span>
                        <span className="text-lg">Manage Reviews</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboardContent;