import React, { useEffect, useState } from "react";
import { fetchUserDetails, warnUser, banUser, unbanUser } from "*/api/admin.js";
import { useParams } from "react-router-dom";

const STATUS_ACTIONS = [
    { value: "warn", label: "Warn" },
    { value: "ban", label: "Ban" },
    { value: "unban", label: "Unban" }
];

export default function UserDetailsAdminContent() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [action, setAction] = useState("");
    const [reason, setReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [showReason, setShowReason] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError("");
        fetchUserDetails(userId)
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch user details.");
                setLoading(false);
            });
    }, [userId]);

    const getAvailableActions = () => {
        if (!user) return [];
        if (user.status === "ACTIVE") return ["warn", "ban"];
        if (user.status === "WARNED") return ["ban", "unban"];
        if (user.status === "BANNED") return ["warn", "unban"];
        return [];
    };

    const handleActionSelect = (val) => {
        setAction(val);
        setReason("");
        setShowReason(true);
    };

    const handleStatusChange = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (action === "warn") await warnUser(user.id, reason);
            if (action === "ban") await banUser(user.id, reason);
            if (action === "unban") await unbanUser(user.id, reason);
            const res = await fetchUserDetails(userId);
            setUser(res.data);
            setShowReason(false);
            setAction("");
            setReason("");
        } catch {
            setError("Failed to update user status.");
        }
        setActionLoading(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-lg text-gray-500">Loading user details...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>
            <div className="space-y-4">
                <div>
                    <span className="block text-gray-600 font-semibold">Full Name</span>
                    <div className="p-2 bg-gray-100 rounded">{user.fullName}</div>
                </div>
                <div>
                    <span className="block text-gray-600 font-semibold">Email</span>
                    <div className="p-2 bg-gray-100 rounded break-all">{user.email}</div>
                </div>
                <div>
                    <span className="block text-gray-600 font-semibold">Phone Number</span>
                    <div className="p-2 bg-gray-100 rounded">{user.phoneNumber}</div>
                </div>
                <div>
                    <span className="block text-gray-600 font-semibold">Role</span>
                    <div className="p-2 bg-gray-100 rounded">{user.role}</div>
                </div>
                <div>
                    <span className="block text-gray-600 font-semibold">Status</span>
                    <div className="flex items-center gap-2">
                        <span className={`p-2 rounded font-semibold ${user.status === "BANNED" ? "bg-red-100 text-red-700" : user.status === "WARNED" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                            {user.status}
                        </span>
                        <span className="text-gray-500 text-sm">{user.statusDescription}</span>
                        {getAvailableActions().length > 0 && (
                            <div className="relative">
                                <select
                                    className="ml-2 border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none"
                                    value=""
                                    onChange={e => handleActionSelect(e.target.value)}
                                >
                                    <option value="">Change status...</option>
                                    {getAvailableActions().map(act => (
                                        <option key={act} value={act}>
                                            {STATUS_ACTIONS.find(a => a.value === act)?.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Reason Modal/Inline */}
            {showReason && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
                    <form
                        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto"
                        onSubmit={handleStatusChange}
                    >
                        <h3 className="text-lg font-bold mb-2">
                            {STATUS_ACTIONS.find(a => a.value === action)?.label} User
                        </h3>
                        <label className="block mb-2 text-gray-700 font-semibold">
                            Reason/Description
                        </label>
                        <textarea
                            className="w-full border rounded p-2 mb-4"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                            rows={3}
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                onClick={() => setShowReason(false)}
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                disabled={actionLoading || !reason.trim()}
                            >
                                {actionLoading ? "Saving..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}