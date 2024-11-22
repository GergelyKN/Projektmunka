import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default UserRoute;
