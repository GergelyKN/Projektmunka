import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import getDayOfWeek, {
  dateComparison,
} from "../../functions/Reservation_Functions/ReservationHelperFunctions";

import { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage() {
  const GETCLOSEDDATESAPI = import.meta.env.VITE_API_GETCLOSEDDATES_URL;
  const [closedDates, setClosedDates] = useState([]);

  useEffect(() => {
    const fetchClosedDates = async () => {
      try {
        const response = await fetch(GETCLOSEDDATESAPI, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP hiba: ${response.status}`);
        }

        const data = await response.json();
        const today = new Date().toLocaleDateString("hu-HU");

        for (const reservation of data["rows"]) {
          reservation["date"] = new Date(
            reservation["date"]
          ).toLocaleDateString("hu-HU");
        }

        setClosedDates(
          data["rows"].filter((x) => dateComparison(today, x["date"]))
        );
      } catch (err) {
        console.error("Hiba történt a foglalások lekérdezése közben: ", err);
      }
    };
    fetchClosedDates();
  }, [GETCLOSEDDATESAPI]);

  return (
    <>
      <NavBar />
      {closedDates.length > 0 && (
        <div className="closedDateContainer">
          <h3>Az alábbi napokon zárva tartunk!</h3>
          {closedDates.map((x) => (
            <p key={x.dateid} className="closedDate">
              {x["date"] + " - " + getDayOfWeek(x["date"])}
            </p>
          ))}
        </div>
      )}

      <article>
        <h1>
          Üdvözlünk a TableTop Bárban – ahol az italfogyasztás és a
          társasjátékok találkoznak!
        </h1>

        <p>
          Lépj be egy olyan helyre, ahol az ínycsiklandó koktélok, kézműves
          sörök és finom borok mellé izgalmas társasjátékos élmények társulnak.
          Legyen szó baráti összejövetelről, randevúról vagy egy csapatépítő
          estéről, nálunk minden adott, hogy a szórakozás és a kikapcsolódás
          tökéletes harmóniában valósuljon meg.
        </p>

        <p>
          A TableTop Bárban több mint 100 különböző társasjátékkal várunk,
          legyen az egy könnyed party játék vagy egy izgalmas stratégiai
          kihívás. A hangulatos környezet és a játékok világához illő, egyedi
          italok garantálják, hogy minden alkalom felejthetetlen élménnyé
          váljon.
        </p>

        <p>
          Nálunk nemcsak a játékmenet, de az ízek is főszerepet kapnak. Próbáld
          ki különleges koktéljainkat, amelyek játékaink ihlette neveikkel
          mosolyt csalnak az arcodra, vagy lazíts egy hűsítő sör társaságában a
          legjobb lépésekre gondolva.
        </p>

        <p>
          Gyere, és tapasztald meg, milyen a TableTop életérzés – a játék öröme
          és az italok élvezete egy helyen! 🎲🍹
        </p>

        <p>Várunk szeretettel!</p>
      </article>
      <Footer />
    </>
  );
}

export default MainPage;
