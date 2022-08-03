import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { auth } from "../../config/firebase";

export default function ProtectedRoute({ children, loginOnly = true }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!user && loginOnly) {
    return <Navigate to="/login" replace />;
  }

  if (user && !loginOnly) {
    return <Navigate to="/" replace />;
  }

  return children;
}
