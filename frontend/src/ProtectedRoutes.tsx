import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoutes;