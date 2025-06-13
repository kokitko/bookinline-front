import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-blue-700 text-white p-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Bookinline</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/" className="hover:underline">About</Link></li>
                        <li><Link to="/" className="hover:underline">Contact</Link></li>
                    </ul>
                </nav>
            </div>
            <ul className="flex space-x-4 text-2xl">
                <li><Link to="/" className="hover:underline">Login</Link></li>
                <li><Link to="/" className="hover:underline">Register</Link></li>
            </ul>
        </header>
    );
}

export default Header;