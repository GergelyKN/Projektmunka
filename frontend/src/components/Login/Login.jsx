import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <NavBar />
      <div className="loginMain">
        <form>
          <fieldset>
            <Link to="/" className="exitLink">
              <div className="exitIcon">X</div>
            </Link>
            <h1>Kérjük jelentkezzen be!</h1>
            <label htmlFor="loginEmail">Email cím: </label>
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              value={email}
              placeholder="email@email.com"
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="loginPassword">Jelszó:</label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button type="submit">Bejelentkezés</button>
            <Link to="/regisztracio" className="registrationLink">
              Még nincs fiókom
            </Link>
          </fieldset>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
