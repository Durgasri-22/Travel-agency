import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy-950 flex flex-col items-center justify-center text-slate-100">
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-brand-gold-600 via-brand-gold-400 to-brand-gold-200 shadow-gold-md animate-pulse">
            <img
              src="/logo.png"
              alt="Sri Guru Tours & Travels"
              className="w-full h-full object-cover rounded-full bg-brand-navy-950"
            />
          </div>
          <div className="flex items-center gap-2 text-brand-gold-400 text-sm font-semibold tracking-wider uppercase">
            <Loader2 className="w-4 h-4 animate-spin text-brand-gold-400" />
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Redirect unauthenticated or non-admin users directly to /admin
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
