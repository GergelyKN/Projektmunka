import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user || !user.isadmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
