// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          credentials: "include", // Include cookies
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const data = await response.json();
        setUser(data.user); // Store user details in state
      } catch (error) {
        console.error("User not logged in:", error);
        navigate("/"); // Redirect to login if not authenticated
      }
    };

    checkLogin();
  }, [navigate]); // Runs only on mount

  return user;
};

export default useAuth;
