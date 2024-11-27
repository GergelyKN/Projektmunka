import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import AdminClosedDay from "./AdminClosedDay";
import { useEffect, useState } from "react";

function AdminClosedDays() {
  const GETCLOSEDDATESAPI = import.meta.env.VITE_API_GETCLOSEDDATES_URL;
  const ADDCLOSEDDATESAPI = import.meta.env.VITE_API_ADMIN_ADDCLOSEDDATE_URL;
  const DELETECLOSEDDATEAPI = import.meta.env
    .VITE_API_ADMIN_DELETECLOSEDDATE_URL;

  const [dateForClose, setDateForClose] = useState("");
  const [closedDates, setClosedDates] = useState([]);

  const fetchClosedDates = async () => {
    try {
      const response = await fetch(GETCLOSEDDATESAPI, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      for (const reservation of data["rows"]) {
        reservation["date"] = new Date(reservation["date"]).toLocaleDateString(
          "hu-HU"
        );
      }

      setClosedDates(data["rows"]);
    } catch (err) {
      console.error("Hiba történt a foglalások lekérdezése közben: ", err);
    }
  };

  const handleDateChange = (event) => {
    setDateForClose(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ADDCLOSEDDATESAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateForClose }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        fetchClosedDates();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  useEffect(() => {
    setDateForClose(new Date().toISOString().split("T")[0]);

    fetchClosedDates();
  }, [GETCLOSEDDATESAPI]);

  const handleDelete = async (dateid) => {
    try {
      const response = await fetch(DELETECLOSEDDATEAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateid }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        fetchClosedDates();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="adminClosedDayContainer">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="ClosedDate">Zárt nap:</label>
            <input
              type="date"
              id="closeDate"
              name="closeDate"
              value={dateForClose}
              onChange={handleDateChange}
              min={"2024-01-01"}
              max={"2025-02-28"}
            />
            <button
              type="submit"
              disabled={
                closedDates
                  .map((x) => x["date"])
                  .includes(
                    new Date(dateForClose).toLocaleDateString("hu-HU")
                  ) || dateForClose < new Date().toISOString().split("T")[0]
              }
            >
              Elküldés
            </button>
            {dateForClose < new Date().toISOString().split("T")[0] ? (
              <h3>Nem lehet múltbeli időpontot beállítani!</h3>
            ) : closedDates
                .map((x) => x["date"])
                .includes(
                  new Date(dateForClose).toLocaleDateString("hu-HU")
                ) ? (
              <h3>A kijelölt nap már szerepel a listában!</h3>
            ) : (
              ""
            )}
          </fieldset>
        </form>
      </div>

      <div className="closedDateContainer">
        <h2>Bezárt napok</h2>

        <AdminClosedDay closedDates={closedDates} handleDelete={handleDelete} />
      </div>
      <Footer />
    </>
  );
}

export default AdminClosedDays;
