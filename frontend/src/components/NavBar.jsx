import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="logo">Logo</div>
      <Link to="/" className="btn" id="MainArea">
        Kezdőlap
      </Link>
      <Link to="/italok" className="btn" id="Drinks">
        Italok
      </Link>
      <Link to="/tarsasjatekok" className="btn" id="BoardGames">
        Társasok
      </Link>
      <Link to="/foglalas" className="btn" id="Reservation">
        Foglalás
      </Link>
      <Link to="/kapcsolat" className="btn" id="Contact">
        Kapcsolat
      </Link>

      <div className="loginDiv">
        <button className="smallBtn" id="UserLogin">
          Fiók Bejelentkezés
        </button>
        <button className="smallBtn" id="RoomLogin">
          Szoba Bejelentkezés
        </button>
      </div>
    </>
  );
}

export default NavBar;
