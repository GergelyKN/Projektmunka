import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function RePassword() {
  const [reEmail, setReEmail] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleEmailChange = (event) => {
    setReEmail(event.target.value);
  };
  const RESETPASSWORDAPI = import.meta.env.VITE_API_RESETPASSWORD_URL;

  const handleSubmit = async (event) => {
    setClicked(true);
    event.preventDefault();
    try {
      const email = reEmail;
      const response = await fetch(RESETPASSWORDAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error;
        if (response.status === 404) {
          console.error("Hibaüzenet a szerver felől:", errorMessage);
          alert(errorMessage);
        }
      } else {
        alert(data.message);
        setRedirectToLogin(true);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterSubmit();
    }
  };

  const cleanupAfterSubmit = () => {
    setReEmail("");
    setClicked(false);
  };
  if (redirectToLogin) {
    return <Navigate to="/bejelentkezes" />;
  }
  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <h1>Jelszó emlékeztető</h1>
          <label htmlFor="Email">Email cím: </label>
          <input
            type="email"
            name="Email"
            id="Email"
            value={reEmail}
            onChange={handleEmailChange}
            required
          />
          {clicked ? (
            <p>Jelszóküldés folyamatban...</p>
          ) : (
            <button type="submit">Elküldés</button>
          )}
        </fieldset>
      </form>
      <Footer />
    </>
  );
}
export default RePassword;
