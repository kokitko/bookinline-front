
import { fetchUsers, fetchUsersByStatus } from '../api/admin.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STATUSES = ['ALL', 'ACTIVE', 'WARNED', 'BANNED'];

function UserManagementContent() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState('ALL');
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            let response;
            if (status === 'ALL') {
                response = await fetchUsers({ page, size });
            } else {
                response = await fetchUsersByStatus(status, { page, size });
            }
            setUsers(response.data.users || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (e) {
            setUsers([]);
            setTotalPages(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [status, page]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(0);
    };

    const handlePrev = () => setPage((p) => Math.max(0, p - 1));
    const handleNext = () => setPage((p) => (p + 1 < totalPages ? p + 1 : p));

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-2xl font-bold">User Management</h2>
                <select
                    className="border rounded px-3 py-2"
                    value={status}
                    onChange={handleStatusChange}
                >
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>
                            {s.charAt(0) + s.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-3 border-b">ID</th>
                            <th className="py-2 px-3 border-b">Full Name</th>
                            <th className="py-2 px-3 border-b">Email</th>
                            <th className="py-2 px-3 border-b">Phone</th>
                            <th className="py-2 px-3 border-b">Status</th>
                            <th className="py-2 px-3 border-b">Role</th>
                            <th className="py-2 px-3 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-3 border-b">{user.id}</td>
                                    <td className="py-2 px-3 border-b">{user.fullName}</td>
                                    <td className="py-2 px-3 border-b">{user.email}</td>
                                    <td className="py-2 px-3 border-b">{user.phoneNumber}</td>
                                    <td className="py-2 px-3 border-b">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                user.status === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-800'
                                                    : user.status === 'WARNED'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : user.status === 'BANNED'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 border-b">{user.role}</td>
                                    <td className="py-2 px-3 border-b">
                                        <button
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition cursor-pointer"
                                            onClick={() => navigate(`/admin/users/${user.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                    onClick={handlePrev}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                    onClick={handleNext}
                    disabled={page + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserManagementContent;

