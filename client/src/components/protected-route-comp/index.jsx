import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, user, children }) => {
  const path = useLocation().pathname;
  console.log("Current path:", path);

  const authPaths = ["/auth/login", "/auth/signup"];
  if (!isAuthenticated && !authPaths.includes(path)) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && authPaths.includes(path)) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/e-com/home" />
    );
  }

  if (isAuthenticated && user?.role !== "admin" && path.startsWith("/admin")) {
    return <Navigate to="/e-com/home" />;
  }

  if (isAuthenticated && user?.role === "admin" && path.startsWith("/e-com")) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (path === "/") {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/e-com/home" />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
