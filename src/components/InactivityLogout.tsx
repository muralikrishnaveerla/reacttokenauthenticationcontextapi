import React, { useEffect, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

const InactivityLogout: React.FC = () => {
  const navigate = useNavigate();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityLimit = 1 * 60 * 1000; // 1 minute in milliseconds
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
      setShowModal(true); // Show the modal instead of logging out immediately
    }, inactivityLimit);
  }, []);

  // Handle user action to extend session or logout
  const handleExtendSession = () => {
    setShowModal(false); // Hide the modal
    resetTimer(); // Reset the timer
  };

  const confirmLogout = () => {
    setShowModal(false); // Hide the modal
    handleLogout(); // Proceed with logout
  };

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

  return (
    <>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Session Expiration Warning</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Your session is about to expire due to inactivity. Would you
                like to extend your session?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={confirmLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleExtendSession}
              >
                Extend Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default InactivityLogout;
