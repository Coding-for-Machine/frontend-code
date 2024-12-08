import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const Logout: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setLoading(true);
        try {
            // Call the Django API logout endpoint
            const response = await axios.post("http://your-django-server.com/api/logout/", {}, { 
                withCredentials: true, // If you're using session cookies
            });
            setLoading(false);
            console.log(response.data.message);  // You can display a message if you like
            // Optionally, remove any client-side session or token if you're using it
            localStorage.removeItem('your_jwt_token_key');
        } catch (err: any) {
            setLoading(false);
            setError("Logout failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <button 
            className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
            onClick={handleLogout}
            disabled={loadng}
        >
            <FiLogOut />
            {loading ? "Logging out..." : "Log out"}
        </button>
    );
};

export default Logout;

