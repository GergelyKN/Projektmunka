import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useState } from "react";

function Contact() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Text, setText] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      ContactFirstName: FirstName,
      ContactLastName: LastName,
      ContactEmail: Email,
      ContactText: Text,
    };

    try {
      const response = await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Hiba történt a kapcsolódáskor: ", error);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setText("");
    }
  };

  return (
    <>
      <NavBar />
      <h3>Kapcsolat</h3>
      <div className="informaciok">
        <p>Cím: 9024 Győr, Mária Terézia út 25/B </p>
        <p>Telefon: +36 10 100 1000</p>
        <p>E-mail: tabletopbar@tabletopbar.hu </p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Nyitvatartás</th>
            </tr>
          </thead>
          <tr>
            <td>Hétfő</td>
            <td>10:00 - 01:00</td>
          </tr>
          <tr>
            <td>Kedd</td>
            <td>10:00 - 01:00</td>
          </tr>
          <tr>
            <td>Szerda</td>
            <td>10:00 - 01:00</td>
          </tr>
          <tr>
            <td>Csütörtök</td>
            <td>10:00 - 01:00</td>
          </tr>
          <tr>
            <td>Péntek</td>
            <td>10:00 - 02:00</td>
          </tr>
          <tr>
            <td>Szombat</td>
            <td>10:00 - 02:00</td>
          </tr>
          <tr>
            <td>Vasárnap</td>
            <td>10:00 - 01:00</td>
          </tr>
        </table>
      </div>
      <div className="uzenet">
        <form action="/api/messages" method="POST" onSubmit={handleSubmit}>
          <fieldset>
            <h3>Írj nekünk!</h3>
            <label htmlFor="ContactLastName">Vezetéknév </label>
            <input
              type="text"
              id="ContactLastName"
              name="ContactLastName"
              required
              placeholder="Varga"
              value={LastName}
              onChange={handleLastNameChange}
            />
            <label htmlFor="ContactFirstName">Keresztnév </label>
            <input
              type="text"
              id="ContactFirstName"
              name="ContactFirstName"
              required
              placeholder="Károly"
              value={FirstName}
              onChange={handleFirstNameChange}
            />
            <label htmlFor="ContactEmail">Email cím </label>
            <input
              type="email"
              id="ContactEmail"
              name="ContactEmail"
              required
              placeholder="valami@email.com"
              value={Email}
              onChange={handleEmailChange}
            />
            <label htmlFor="ContactText">Üzenet </label>
            <textarea
              name="ContactText"
              id="ContactText"
              required
              placeholder="Üzenj nekünk valamit!"
              maxLength={350}
              rows={15}
              cols={30}
              value={Text}
              onChange={handleTextChange}
            ></textarea>
            <button id="ContactSendForm" type="submit">
              Küldés
            </button>
          </fieldset>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default Contact;
