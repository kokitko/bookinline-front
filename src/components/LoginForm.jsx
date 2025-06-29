import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

import { login } from '../auth/authService.js';

const initialState = {
    email: '',
    password: '',
};

function LoginForm() {
    const [userData, setUserData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const res = await login(userData);
            const data = res.data;
            if (res.status === 200 && data.accessToken) {
                setSuccess(true);
                setUserData(initialState);
                await fetchUser();
                navigate('/');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {error && <div className="text-red-600 mb-3">{error}</div>}
                {success && <div className="text-green-600 mb-3">Login successful!</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded font-bold text-white transition-colors ${
                        loading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    }`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
