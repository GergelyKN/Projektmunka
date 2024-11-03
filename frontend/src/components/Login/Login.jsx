import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { loginEmail: email, loginPassword: password };
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUser(data.user[0]);
        localStorage.setItem("authToken", data.token);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return token && !isTokenExpired(token);
  };
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setUserLoggedIn(false);
    setUser({});
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setUserLoggedIn(true);
    }
  }, [user]);

  return (
    <>
      <NavBar />
      {userLoggedIn && (
        <>
          <p>{user.email}</p>
          <button onClick={handleLogOut}>Kijelentkezés</button>
        </>
      )}
      <div className="loginMain">
        <form action="/api/users/login" method="POST" onSubmit={handleSubmit}>
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
            <button id="logSendForm" type="submit">
              Bejelentkezés
            </button>
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
