import { isLoggedIn } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedPages = () => {
  if (isLoggedIn()) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default AuthenticatedPages;
