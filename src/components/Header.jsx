import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAccessToken } from '../auth/authService.js';
import { useAuth } from '*/auth/AuthContext.jsx';

function Header() {
    const hasToken = !!getAccessToken();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();
    const role = user?.role || 'GUEST';

    return (
        <header className="bg-blue-700 text-white shadow-md">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight mr-6">
                        <Link to="/" className="cursor-pointer">Bookinline</Link>
                    </h1>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6 text-base">

                            {hasToken && role === 'GUEST' && <li><Link to="/bookings" className="hover:underline">My Bookings</Link></li>}
                            {hasToken && role === 'GUEST' && <li><Link to="/my-reviews" className="hover:underline">My Reviews</Link></li>}

                            {hasToken && role === 'HOST' && <li><Link to="/properties/list" className="hover:underline">My Properties</Link></li>}
                            {hasToken && role === 'HOST' && <li><Link to="/bookings/host" className="hover:underline">Host Bookings</Link></li>}

                            <li><Link to="/about" className="hover:underline">About</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="hidden md:flex items-center space-x-4 text-base">
                    {!hasToken ? (
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    ) : (
                        <Link to="/profile" className="hover:underline">My Profile</Link>
                    )}
                </div>
                {/* Mobile menu button */}
                <button
                    className="md:hidden flex items-center px-2 py-1 border rounded text-white border-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <nav>
                        <ul className="flex flex-col space-y-2 text-base">

                            {hasToken && role === 'GUEST' && <li><Link to="/bookings" className="hover:underline">My Bookings</Link></li>}
                            {hasToken && role === 'GUEST' && <li><Link to="/my-reviews" className="hover:underline">My Reviews</Link></li>}

                            {hasToken && role === 'HOST' && <li><Link to="/properties/list" className="hover:underline">My Properties</Link></li>}
                            {hasToken && role === 'HOST' && <li><Link to="/bookings/host" className="hover:underline">Host Bookings</Link></li>}

                            <li><Link to="/about" className="hover:underline">About</Link></li>
                        </ul>
                    </nav>
                    <div className="flex flex-col space-y-2 mt-4">
                        {!hasToken ? (
                            <>
                                <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
                            </>
                        ) : (
                            <Link to="/profile" className="hover:underline" onClick={() => setMenuOpen(false)}>My Profile</Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;