import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "./components/ContextApi";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = UseAuth();

  if (!auth?.accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
