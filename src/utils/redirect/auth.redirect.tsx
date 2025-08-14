import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthRedirect = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (accessToken && refreshToken) {
      if (["/signUp", "/signIn", "/"].includes(currentPath)) {
        navigate("/dashboard/home", { replace: true });
      }
    } 
    else if (!accessToken && !refreshToken) {
      if (!["/signUp", "/signIn"].includes(currentPath)) {
        navigate("/signUp", { replace: true });
      }
    }
  }, [accessToken, refreshToken, navigate]);

  return null; 
};
