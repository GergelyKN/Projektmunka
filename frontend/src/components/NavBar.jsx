function NavBar() {
  return (
    <>
      <div className="logo">Logo</div>
      <button className="btn" id="MainArea">
        Kezdőlap
      </button>
      <button className="btn" id="Drinks">
        Italok
      </button>
      <button className="btn" id="Games">
        Társasok
      </button>
      <button className="btn" id="Reservation">
        Foglalás
      </button>
      <button className="btn" id="Contact">
        Kapcsolat
      </button>
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
