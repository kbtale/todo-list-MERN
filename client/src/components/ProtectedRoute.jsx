import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-[#FFD600] border-t-transparent rounded-full animate-spin" />
      </div>
    );
    
    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
};
