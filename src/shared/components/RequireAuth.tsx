import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth.hook";

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
}: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
