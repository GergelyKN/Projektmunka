import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RoomNavBar.css";

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
    <nav className="navbar navbarRoom">
      <img className="navbar-logo" src="/logo_no_background.png" alt="Logo" />
      <Link to="/" className=" linkRoom">
        Kezdőlap
      </Link>

      <Link to="/italokrendeles" className=" linkRoom">
        Italok
      </Link>

      <Link to="/rendelesleadas" className=" linkRoom">
        Rendelés
      </Link>
      <button onClick={handleLogOut} className="linkRoom roomLogout">
        Kijelentkezés
      </button>
    </nav>
  );
}

export default RoomNavBar;
