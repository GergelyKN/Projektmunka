import "./NavBar.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(storedUser);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("quantitiesToSend");
    setUser(null);
    alert("Sikeres Kijelentkezés!");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-up">
        <Link to="/">
          <img
            className="navbar-logo"
            src="/logo_no_background.png"
            alt="Logo"
          />
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Kezdőlap
          </Link>
          <Link to="/italok" className="nav-link">
            Italok
          </Link>
          <Link to="/tarsasjatekok" className="nav-link">
            Társasok
          </Link>
          <Link to="/foglalas" className="nav-link">
            Foglalás
          </Link>
          <Link to="/kapcsolat" className="nav-link">
            Kapcsolat
          </Link>
          {user && (
            <>
              <Link to="/italokrendeles" className="nav-link">
                Szoba
              </Link>
              <Link to="/sajatfoglalasok" className="nav-link">
                Saját foglalások
              </Link>
              <Link to="/profilszerkesztes" className="nav-link">
                Profil szerkesztése
              </Link>
              <button onClick={handleLogOut} className="nav-link logout-button">
                Kijelentkezés
              </button>
            </>
          )}
          {!user && (
            <Link to="/bejelentkezes" className="nav-link">
              Fiók Bejelentkezés
            </Link>
          )}
        </div>
      </div>
      {user && user.isadmin && (
        <div className="navbar-down">
          <Link to="/admin/italok" className="nav-admin-link">
            Admin Italok
          </Link>
          <Link to="/admin/tarsasjatekok" className="nav-admin-link">
            Admin Társasok
          </Link>
          <Link to="/admin/foglalas" className="nav-admin-link">
            Admin Foglalások
          </Link>
          <Link to="/admin/zartnapok" className="nav-admin-link">
            Admin Zárt Napok
          </Link>
          <Link to="/admin/profilok" className="nav-admin-link">
            Admin Profilok
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
