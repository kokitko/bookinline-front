import React from 'react';

const AboutContent = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="mb-4 text-gray-700">
            Hello! My name is <span className="font-semibold">Vladyslav Kokitko</span>. I am very grateful that you have visited my project!
        </p>
        <p className="mb-4 text-gray-700">
            This is a booking-type application for short-term bookings, built mainly with <span className="font-semibold">React (JavaScript)</span> on the frontend and <span className="font-semibold">Spring Boot (Java)</span> on the backend. It is my first product-ready project, and I hope you enjoy exploring it.
        </p>
        <p className="mb-4 text-gray-700">
            If you have any questions, suggestions, or just want to connect, feel free to reach out:
        </p>
        <ul className="mb-4 text-gray-700 list-disc list-inside">
            <li>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:kokitko.vladyslav@gmail.com" className="text-blue-600 underline">
                    kokitko.vladyslav@gmail.com
                </a>
            </li>
            <li>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a href="https://www.linkedin.com/in/kokitko" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    www.linkedin.com/in/kokitko
                </a>
            </li>
            <li>
                <span className="font-semibold">GitHub:</span>{" "}
                <a href="https://github.com/kokitko" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    github.com/kokitko
                </a>
            </li>
        </ul>
        <p className="mb-4 text-gray-700">
            Thank you for your interest, and I hope you enjoy using the project!
        </p>
    </div>
);

export default AboutContent;