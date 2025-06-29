import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth/authService.js'; 
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

const initialState = {
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: 'GUEST',
};

function RegisterForm() {
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

        if (userData.password !== userData.repeatPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const res = await register({
                ...userData,
                repeatPassword: undefined
            });
            const data = res.data;
            if (res.status === 200 && data.accessToken) {
                setSuccess(true);
                setUserData(initialState);
                await fetchUser();
                navigate('/');
            } else {
                setError('Registration failed.');
            }
        } catch (err) {
            setError(err.message || 'Registration failed.');
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
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
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
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Repeat Password</label>
                    <input
                        type="password"
                        name="repeatPassword"
                        value={userData.repeatPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-medium">Role</label>
                    <select
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="GUEST">Guest</option>
                        <option value="HOST">Host</option>
                    </select>
                </div>
                {error && <div className="text-red-600 mb-3">{error}</div>}
                {success && <div className="text-green-600 mb-3">Registration successful!</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded font-bold text-white transition-colors ${
                        loading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    }`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;