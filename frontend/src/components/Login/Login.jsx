import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../functions/Login_Functions/LoginHelperFunctions";
import "./Login.css";

function Login() {
  const POSTLOGINAPI = import.meta.env.VITE_API_POSTLOGIN_URL;

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(POSTLOGINAPI, {
        mode: "cors",
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
        navigate("/");
      } else {
        alert(data.error);
        setLoginEmail("");
        setLoginPassword("");
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage mainpageLogin">
        <form className="loginForm" onSubmit={handleSubmit}>
          <fieldset className="loginFieldset">
            <div className="exitLink">
              <Link to="/" className="exitIcon">
                X
              </Link>
            </div>
            <h1 className="loginH1">Kérjük jelentkezzen be!</h1>
            <label className="loginLabel" htmlFor="loginEmail">
              Email cím:
            </label>
            <input
              className="loginInput"
              type="email"
              name="loginEmail"
              id="loginEmail"
              value={loginEmail}
              placeholder="email@email.com"
              onChange={handleEmailChange}
              required
            />
            <label className="loginLabel" htmlFor="loginPassword">
              Jelszó:
            </label>
            <input
              className="loginInput"
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={loginPassword}
              onChange={handlePasswordChange}
              required
            />
            <button className="loginButton" id="logSendForm" type="submit">
              Bejelentkezés
            </button>

            <Link to="/regisztracio" className="loginLink">
              Még nincs fiókom
            </Link>
            <Link to="/jelszoemlekezteto" className="loginLink">
              Elfelejtett jelszó
            </Link>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
