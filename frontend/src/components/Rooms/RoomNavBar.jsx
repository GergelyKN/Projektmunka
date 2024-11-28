import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RoomNavBar() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("quantitiesToSend");

    alert("Sikeres Kijelentkezés!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img className="navbar-logo" src="/logo_no_background.png" alt="Logo" />
      <Link to="/" className="nav-link">
        Kezdőlap
      </Link>

      <Link to="/italokrendeles" className="nav-link">
        Italok
      </Link>

      <Link to="/rendelesleadas" className="nav-link">
        Rendelés
      </Link>
      <button onClick={handleLogOut} className="nav-small-link">
        Kijelentkezés
      </button>
    </nav>
  );
}

export default RoomNavBar;
