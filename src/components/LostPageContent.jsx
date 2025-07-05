import React from "react";
import { Link } from "react-router-dom";

const LostPageContent = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
            Oops! You're lost.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-md">
            The page you're looking for doesn't exist or has moved. Let's get you back on track!
        </p>
        <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-base md:text-lg font-medium"
        >
            Go Home
        </Link>
    </div>
);

export default LostPageContent;