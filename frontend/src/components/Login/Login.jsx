import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../functions/Login_Functions/LoginHelperFunctions";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUserData = { loginEmail, loginPassword };
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUserData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user[0]));
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserLoggedIn(false);
    setUser({});
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(parsedUser);
    if (isAuthenticated()) {
      setUserLoggedIn(true);
    }
  }, [loginEmail]);

  return (
    <>
      <NavBar />
      {userLoggedIn && (
        <>
          <p>{user.email}</p>
          <button onClick={handleLogOut}>Kijelentkezés</button>
        </>
      )}
      {userLoggedIn && user.isadmin && (
        <>
          <Link to="/admin/italok">Admin Italok felület</Link>
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
              value={loginEmail}
              placeholder="email@email.com"
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="loginPassword">Jelszó:</label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={loginPassword}
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
