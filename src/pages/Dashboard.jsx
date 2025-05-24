// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Redirect to login if no token found
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome to PC Dashboard</h1>
            <p className="mb-8 text-lg">
                You are successfully logged in. Use this dashboard to manage placement cell activities.
            </p>
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
