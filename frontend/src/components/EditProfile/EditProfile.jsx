import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//Megoldani, hogy ha csak az egyik értéket frissítem, akkor is működjön
//Kötelező mező jelölése *-gal

function EditProfile() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [changeEmail, setChangeEmail] = useState(true);

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const cleanupAfterSubmit = () => {
    setNewEmail("");
    setNewPassword("");
  };
  const updatedUserAPI = import.meta.env.VITE_API_UPDATEUSER_URL;

  const handleEmailChange = (e) => {
    e.preventDefault();
    setChangeEmail(!changeEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = user.email;
      const newemail = newEmail;
      const newhashedpassword = newPassword;

      const response = await fetch(updatedUserAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newemail,
          newhashedpassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        const updatedUser = { ...user, email: newemail };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterSubmit();
    }
  };

  if (!user) {
    return <Navigate to="/bejelentkezes" />;
  }
  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <h1>Profil Szerkesztése</h1>

          <label htmlFor="updatedEmail">Email cím: </label>
          <input
            type="email"
            id="updatedEmail"
            name="updatedEmail"
            value={newEmail}
            onChange={handleNewEmailChange}
            disabled={changeEmail}
            required
          />
          <button onClick={handleEmailChange}>
            {changeEmail ? "Email cím változtatás" : String.fromCharCode(10004)}
          </button>

          <label htmlFor="updatedPassword">Jelszó: </label>
          <input
            type="password"
            id="updatedPassword"
            name="updatedPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <button type="submit">Elküldés</button>
        </fieldset>
      </form>
      <Footer />
    </>
  );
}

export default EditProfile;
