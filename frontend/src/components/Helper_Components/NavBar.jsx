import "./NavBarFooter.css";

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
    setUser(null);
    alert("Sikeres Kijelentkezés!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img className="navbar-logo" src="/logo_no_background.png" alt="Logo" />

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
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            {user.isadmin && (
              <>
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
              </>
            )}
            <Link to="/sajatfoglalasok" className="nav-small-link">
              Saját foglalások
            </Link>
            <Link to="/profilszerkesztes" className="nav-small-link">
              Profilom
            </Link>
            <button onClick={handleLogOut} className="nav-small-link">
              Kijelentkezés
            </button>
          </>
        ) : (
          <Link to="/bejelentkezes" className="nav-small-link">
            Fiók Bejelentkezés
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
