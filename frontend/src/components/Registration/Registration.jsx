import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../functions/Login_Functions/LoginHelperFunctions";

import "./Registration.css";

function Registration() {
  const POSTUSERAPI = import.meta.env.VITE_API_POSTUSER_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleVerPasswordChange = (event) => {
    setVerPassword(event.target.value);
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      regFirstName: firstName,
      regLastName: lastName,
      regEmail: email,
      regPassword: password,
    };
    try {
      const response = await fetch(POSTUSERAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setRedirectToLogin(true);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVerPassword("");
    }
  };
  if (redirectToLogin) {
    return <Navigate to="/bejelentkezes" />;
  }

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage mainpageRegistration">
        <form className="regForm" onSubmit={handleSubmit}>
          <fieldset className="regFieldset">
            <div className="exitLink">
              <Link to="/" className="exitIcon">
                X
              </Link>
            </div>
            <h1 className="regH1">Regisztráció</h1>
            <label className="regLabel" htmlFor="regLastName">
              Vezetéknév:
            </label>
            <input
              className="regInput"
              type="text"
              name="regLastName"
              id="regLastName"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Kiss"
              required
            />
            <label className="regLabel" htmlFor="regFirstName">
              Keresztnév:
            </label>
            <input
              className="regInput"
              type="text"
              name="regFirstName"
              id="regFirstName"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="János"
              required
            />

            <label className="regLabel" htmlFor="regEmail">
              Email cím:
            </label>
            <input
              className="regInput"
              type="email"
              name="regEmail"
              id="regEmail"
              value={email}
              placeholder="email@email.com"
              onChange={handleEmailChange}
              required
            />
            <label className="regLabel" htmlFor="regPassword">
              Jelszó:
            </label>
            <input
              className="regInput"
              type="password"
              name="regPassword"
              id="regPassword"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label className="regLabel" htmlFor="regVerPassword">
              Jelszó megerősítése:
            </label>
            <input
              className="regInput"
              type="password"
              name="regVerPassword"
              id="regVerPassword"
              value={verPassword}
              onChange={handleVerPasswordChange}
              required
            />
            <button className="regButton" id="regSendForm" type="submit">
              Fiók Létrehozása
            </button>
            <Link to="/bejelentkezes" className="regLink">
              Már van fiókom
            </Link>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Registration;
