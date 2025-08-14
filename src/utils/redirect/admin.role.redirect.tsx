import Cookies from "js-cookie";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
interface AdminRouteProps {
    element: JSX.Element;
  }

export const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const role = Cookies.get("role"); 
  if (role !== 'admin') {
    return <Navigate to="/dashboard/home" replace />;
  }
  return element;
};
