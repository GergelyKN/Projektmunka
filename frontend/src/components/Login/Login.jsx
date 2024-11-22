import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../functions/Login_Functions/LoginHelperFunctions";

//Kötelező mező jelölése *-gal
function Login() {
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
      const response = await fetch("http://localhost:3000/api/users/login", {
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
    <>
      <NavBar />
      <div className="loginMain">
        <form onSubmit={handleSubmit}>
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
            <Link to="/jelszoemlekezteto" className="passwordreLink">
              Elfelejtett jelszó
            </Link>
          </fieldset>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
