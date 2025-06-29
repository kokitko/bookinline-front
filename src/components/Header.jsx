import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const hasToken = !!sessionStorage.getItem('accessToken');
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-blue-700 text-white shadow-md">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight mr-6">
                        <Link to="/" className="cursor-pointer">Bookinline</Link>
                    </h1>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6 text-base">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/" className="hover:underline">About</Link></li>
                            <li><Link to="/" className="hover:underline">Contact</Link></li>
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
                            <li><Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link></li>
                            <li><Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link></li>
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