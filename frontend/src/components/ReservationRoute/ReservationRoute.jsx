import { Navigate } from "react-router-dom";

function ReservationRoute({ children }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user) {
    return <Navigate to="/bejelentkezes" />;
  }

  return children;
}

export default ReservationRoute;
