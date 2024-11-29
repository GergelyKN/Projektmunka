import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function EditProfile() {
  const UPDATEUSERAPI = import.meta.env.VITE_API_UPDATEUSER_URL;
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changeEmail, setChangeEmail] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("quantitiesToSend");
    setUser(null);
    alert("Sikeres Kijelentkezés!");
    navigate("/");
  };

  useEffect(() => {
    if (loggedInUser && loading) {
      setUser(loggedInUser);
      setLoading(false);
      setNewEmail(loggedInUser.email);
    }
  }, [loggedInUser, loading]);

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const cleanupAfterSubmit = () => {
    setNewPassword("");
    setClicked(false);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setChangeEmail(!changeEmail);
  };

  const handleSubmit = async (event) => {
    setClicked(true);
    event.preventDefault();
    try {
      const email = user.email;
      const newemail = newEmail;
      const newhashedpassword = newPassword;

      const response = await fetch(UPDATEUSERAPI, {
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
        handleLogOut();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterSubmit();
    }
  };

  if (!loggedInUser) {
    return <Navigate to="/bejelentkezes" />;
  }
  return (
    <>
      <NavBar />

      {loading ? (
        <p>Betöltés...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h1>Profil Szerkesztése</h1>
              {user.isadmin ? null : (
                <>
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
                    {changeEmail
                      ? "Email cím változtatás"
                      : String.fromCharCode(10004)}
                  </button>
                </>
              )}

              <label htmlFor="updatedPassword">Új jelszó: </label>
              <input
                type="password"
                id="updatedPassword"
                name="updatedPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              {clicked ? (
                <p>Jelszóváltoztatás folyamatban...</p>
              ) : (
                <button type="submit">Elküldés</button>
              )}
            </fieldset>
          </form>
        </>
      )}

      <Footer />
    </>
  );
}

export default EditProfile;
