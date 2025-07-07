import React, { useState } from "react";
import { useAuth } from "*/auth/AuthContext";
import { logout } from "*/auth/authService";
import { useNavigate } from "react-router-dom";
import { updateUserEmail,
        updateUserPhoneNumber,
        updateUserPassword,
        deleteUserAccount } from "*/api/users.js";

function ProfileContent() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Editable fields state
    const [edit, setEdit] = useState({
        email: false,
        phoneNumber: false,
        password: false,
    });

    const [form, setForm] = useState({
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: "",
        confirmPassword: "",
        deletePassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleLogout = async () => {
        setLoading(true);
        setMsg("");
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            setMsg("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Update field handler
    const handleUpdate = async (field) => {
        setLoading(true);
        setMsg("");
        try {
            let payload = {
                email: user.email,
                password: "payload",
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
            };
            if (field === "email") {
                if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                    setMsg("Invalid email format.");
                    setLoading(false);
                    return;
                }
                payload.email = form.email;
                await updateUserEmail(payload);
                await logout();
                navigate("/login");
            };
            if (field === "phoneNumber") {
                if (
                    !form.phoneNumber ||
                    !/^(\+?\d{1,3})?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/.test(form.phoneNumber)
                ) {
                    setMsg("Invalid phone number format.");
                    setLoading(false);
                    return;
                }
                payload.phoneNumber = form.phoneNumber
                await updateUserPhoneNumber(payload);
            };
            if (field === "password") {
                if (form.password !== form.confirmPassword) {
                    setMsg("Passwords do not match.");
                    setLoading(false);
                    return;
                }
                if (form.password.length < 6) {
                    setMsg("Password must be at least 6 characters long.");
                    setLoading(false);
                    return;
                }
                payload.password = form.password;
                await updateUserPassword(payload);
            }
            window.location.reload();
            setMsg("Updated successfully.");
            setEdit({ ...edit, [field]: false });
        } catch (err) {
            setMsg("Update failed.");
        }
        setLoading(false);
    };

    // Delete account handler
    const handleDelete = async () => {
        setLoading(true);
        setMsg("");
        try {
            await deleteUserAccount({ password: form.deletePassword });
            await logout();
            navigate("/login");
        } catch (err) {
            setMsg("Delete failed. Check your password.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profile</h2>
                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div>
                <div className="mb-4">
                    <label className="block text-gray-600">Full Name</label>
                    <div className="p-2 bg-gray-100 rounded">{user.fullName}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Role</label>
                    <div className="p-2 bg-gray-100 rounded">{user.role}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Status</label>
                    <div className="p-2 bg-gray-100 rounded">{user.status} - {user.statusDescription}</div>
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-600">Email</label>
                    {edit.email ? (
                        <div className="flex gap-2">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="border rounded p-2 flex-1"
                            />
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                onClick={() => handleUpdate("email")}
                                disabled={loading}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                onClick={() => setEdit({ ...edit, email: false })}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="p-2 bg-gray-100 rounded flex-1">{user.email}</span>
                            <button
                                className="text-blue-500 underline cursor-pointer"
                                onClick={() => setEdit({ ...edit, email: true })}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block text-gray-600">Phone Number</label>
                    {edit.phoneNumber ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                className="border rounded p-2 flex-1"
                            />
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                onClick={() => handleUpdate("phoneNumber")}
                                disabled={loading}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                onClick={() => setEdit({ ...edit, phoneNumber: false })}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="p-2 bg-gray-100 rounded flex-1">{user.phoneNumber}</span>
                            <button
                                className="text-blue-500 underline cursor-pointer"
                                onClick={() => setEdit({ ...edit, phoneNumber: true })}
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-600">Password</label>
                    {edit.password ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="password"
                                name="password"
                                placeholder="New password"
                                value={form.password}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="border rounded p-2"
                            />
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                    onClick={() => handleUpdate("password")}
                                    disabled={loading}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                    onClick={() => setEdit({ ...edit, password: false })}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => setEdit({ ...edit, password: true })}
                        >
                            Change Password
                        </button>
                    )}
                </div>
                {/* Delete Account */}
                <div className="mb-4 border-t pt-4">
                    <label className="block text-red-600 font-semibold">Delete Account</label>
                    <input
                        type="password"
                        name="deletePassword"
                        placeholder="Enter password to confirm"
                        value={form.deletePassword}
                        onChange={handleChange}
                        className="border rounded p-2 mt-2"
                    />
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 block cursor-pointer"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete Account
                    </button>
                </div>
                {msg && <div className="mt-2 text-center text-sm text-red-500">{msg}</div>}
            </div>
        </div>
    );
} 

export default ProfileContent;