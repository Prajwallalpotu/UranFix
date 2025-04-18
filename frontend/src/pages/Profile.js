import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";

const backendURL = process.env.REACT_APP_BACKEND_URL

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            window.location.href = "/login";
        } else {
            axios.get(`${backendURL}/user/profile/${user_id}`)
                .then(res => setProfile(res.data))
                .catch(err => console.error("Error fetching profile:", err));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        window.location.href = "/login";
    };

    return (
        <Layout>
            <div className="profile-container">
                {profile ? (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",position: "relative" }}>
                            <h2>Welcome, {profile.name}</h2>
                            <EditIcon
                                sx={{ cursor: "pointer", color: "#007bff", position: "absolute", right: 5,top: 0, ":hover": { color: "#0056b3" } }}
                                onClick={() => window.location.href = "/edit-profile"}
                            />
                        </Box>
                        
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>User ID:</strong> {profile.user_id}</p>
                        <p><strong>Role:</strong> {profile.role}</p>
                        <button 
                            onClick={handleLogout} 
                            style={{ 
                                padding: "10px 20px", 
                                backgroundColor: "#f44336", 
                                color: "#fff", 
                                border: "none", 
                                borderRadius: "5px", 
                                cursor: "pointer",
                                marginTop: "20px"
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </Layout>
    );
};

export default Profile;
