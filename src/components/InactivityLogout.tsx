import React, { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

const InactivityLogout: React.FC = () => {
  const navigate = useNavigate();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityLimit = 1 * 60 * 1000; // 1 minute in milliseconds

  // Function to check if the token is expired
  const isTokenExpired = (): boolean => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    }
    return true;
  };

  // Logout and redirect function
  const handleLogout = (): void => {
    localStorage.removeItem("accessToken");
    navigate("/reacttokenauthenticationcontextapi/login");
  };

  // Reset the inactivity timer on user activity
  const resetTimer = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      handleLogout();
    }, inactivityLimit);
  }, []);

  // Monitor token expiration and user inactivity
  useEffect(() => {
    const events = ["mousemove", "keydown", "click"];

    if (isTokenExpired()) {
      handleLogout();
    }

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // Set initial timer

    const tokenCheckInterval = setInterval(() => {
      if (isTokenExpired()) {
        handleLogout();
      }
    }, 60 * 1000); // Check every minute

    // Cleanup on unmount
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      clearInterval(tokenCheckInterval);
    };
  }, [resetTimer]);

  return <div></div>;
};

export default InactivityLogout;
