// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
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

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        const { collegeEmail, password } = formData;
        if (!collegeEmail || !password) return "All fields are required.";
        if (!collegeEmail.includes("@")) return "Invalid email format.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const errorMsg = validate();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/pc/login", {
                collegeEmail: formData.collegeEmail,
                password: formData.password,
            });

            localStorage.setItem("token", response.data.token);
            // Optionally store user data or role here

            navigate("/dashboard");
        } catch (err) {
            const backendError = err.response?.data;
            const message =
                typeof backendError === "string"
                    ? backendError
                    : backendError?.error || "Login failed. Please try again.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">PC Login</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 border border-red-300 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="collegeEmail" className="block text-sm font-medium text-gray-700">
                            College Email
                        </label>
                        <input
                            id="collegeEmail"
                            type="email"
                            name="collegeEmail"
                            value={formData.collegeEmail}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="example@college.edu"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Optional: Add links to "Forgot Password?" or "Register" */}
                {/* <div className="mt-4 text-sm text-center text-gray-600">
                    Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
