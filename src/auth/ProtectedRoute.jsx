import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setIsAuthenticated(true);
        setUserData(response.data); // Store the user data
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator while verifying the token
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Pass user data as props to the child component
  return React.cloneElement(children, { userData });
};

export default ProtectedRoute;
