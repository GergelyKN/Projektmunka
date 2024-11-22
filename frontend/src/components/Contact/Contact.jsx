import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useState, useEffect } from "react";

function Contact() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Text, setText] = useState("");
  const [groupedInfos, setGroupedInfos] = useState([]);
  const [user, setUser] = useState(null);

  const GETOPENINFOSAPI = import.meta.env.VITE_API_OPENINFOS_URL;

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

  useEffect(() => {
    const fetchOpenInfos = async () => {
      try {
        const response = await fetch(GETOPENINFOSAPI, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status >= 400) {
          throw new Error("Szerver Error");
        }
        const data = await response.json();

        const openInfosObject = data.rows.reduce((acc, openinfo) => {
          acc[openinfo.dayid] = {
            day: openinfo.day,
            startHour: openinfo.starthour,
            endHour: openinfo.endhour,
          };
          return acc;
        }, {});
        setGroupedInfos(openInfosObject);
      } catch (err) {
        console.error("Hiba történt a nyitvatartés lekérdezése közben: ", err);
      }
    };

    fetchOpenInfos();

    const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(storedUser);
  }, [GETOPENINFOSAPI]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname || "");
      setLastName(user.lastname || "");
      setEmail(user.email || "");
    }
  }, [user]);

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
        mode: "cors",
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
        <p>E-mail: tabletopbaruni@gmail.com </p>
        <table id="openhours">
          <thead>
            <tr>
              <th colSpan={2}>Nyitvatartás</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedInfos).map((key) => {
              const openinfo = groupedInfos[key];
              return (
                <tr key={key}>
                  <td>{openinfo.day}</td>
                  <td>
                    {(openinfo.startHour < 10
                      ? "0" + openinfo.startHour + ":00"
                      : openinfo.startHour + ":00") +
                      " - " +
                      (openinfo.endHour < 10
                        ? "0" + openinfo.endHour + ":00"
                        : openinfo.endHour + ":00")}
                  </td>
                </tr>
              );
            })}
          </tbody>
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
              placeholder={user?.lastname || "Varga"}
              value={user?.lastname || LastName}
              onChange={user ? undefined : handleLastNameChange}
              disabled={Boolean(user)}
            />
            <label htmlFor="ContactFirstName">Keresztnév </label>
            <input
              type="text"
              id="ContactFirstName"
              name="ContactFirstName"
              required
              placeholder={user?.firstname || "Károly"}
              value={user?.firstname || FirstName}
              onChange={user ? undefined : handleFirstNameChange}
              disabled={Boolean(user)}
            />
            <label htmlFor="ContactEmail">Email cím </label>
            <input
              type="email"
              id="ContactEmail"
              name="ContactEmail"
              required
              placeholder={user?.email || "valami@email.com"}
              value={user?.email || Email}
              onChange={user ? undefined : handleEmailChange}
              disabled={Boolean(user)}
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
