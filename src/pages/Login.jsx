// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        collegeEmail: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const { collegeEmail, password } = formData;
        if (!collegeEmail || !password) {
            return "All fields are required";
        }
        if (!collegeEmail.includes("@")) {
            return "Invalid email format";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMsg = validate();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await axios.post(
                "http://localhost:8080/api/pc/login",
                {
                    collegeEmail: formData.collegeEmail,
                    password: formData.password,
                }
            );

            // Save JWT token in localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 space-y-6 animate-fadeIn"
            >
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-2">PC Login</h2>
                    <p className="text-gray-500">Access your placement dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-center text-sm font-medium">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="collegeEmail" className="block text-gray-700 font-semibold mb-1">
                        College Email
                    </label>
                    <input
                        type="email"
                        name="collegeEmail"
                        placeholder="you@college.edu"
                        value={formData.collegeEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition duration-200"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    Need access? Contact your TPO.
                </p>
            </form>
        </div>
    );

};

export default Login;
