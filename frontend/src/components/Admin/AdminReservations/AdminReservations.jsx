import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import AdminReservation from "./AdminReservation";
import { useEffect, useState } from "react";

import "./AdminReservations.css";

function AdminReservations() {
  const GETRESERVATIONSAPI = import.meta.env.VITE_API_ADMIN_GETRESERVATIONS_URL;
  const DELETERESERVATIONAPI = import.meta.env
    .VITE_API_ADMIN_DELETERESERVATION_URL;

  const [selectedDate, setSelectedDate] = useState("");
  const [comparisonDate, setComparisonDate] = useState("");
  const [searchByDate, setSearchByDate] = useState(false);

  const [groupedReservations, setGroupedReservations] = useState([]);
  const [groupedReservationForDisplay, setGroupedReservationForDisplay] =
    useState([]);
  const [clickedStates, setClickedStates] = useState({});

  const handleSelectedDateChange = (e) => {
    setSelectedDate(e.target.value);
    setComparisonDate(new Date(e.target.value).toLocaleDateString("hu-HU"));
  };
  const handleSearchByDateChange = (e) => {
    setSearchByDate(e.target.checked);
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(GETRESERVATIONSAPI, {
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

      for (const reservation of data["rows"]) {
        reservation["date"] = new Date(reservation["date"]).toLocaleDateString(
          "hu-HU"
        );
      }
      const groupedData = data["rows"].reduce((acc, reservation) => {
        if (!acc[reservation.date]) {
          acc[reservation.date] = [];
        }
        acc[reservation.date].push(reservation);
        return acc;
      }, {});

      setGroupedReservations(groupedData);
    } catch (err) {
      console.error("Hiba történt a foglalások lekérdezése közben: ", err);
    }
  };
  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setComparisonDate(new Date().toLocaleDateString("hu-HU"));
    fetchReservations();
  }, [GETRESERVATIONSAPI]);

  useEffect(() => {
    if (groupedReservations) {
      let AllRess = {};
      if (searchByDate && selectedDate) {
        for (const [key, value] of Object.entries(groupedReservations)) {
          if (key === comparisonDate) {
            AllRess[key] = value;
          }
        }
      } else {
        for (const [key, value] of Object.entries(groupedReservations)) {
          AllRess[key] = value;
        }
      }
      setGroupedReservationForDisplay(AllRess);
    }
  }, [selectedDate, searchByDate, comparisonDate, groupedReservations]);

  const handleDelete = async (reservationid) => {
    setClickedStates((prev) => ({ ...prev, [reservationid]: true }));
    try {
      console.log(reservationid);
      const response = await fetch(DELETERESERVATIONAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationid }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      }
      alert(data.message);
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      await fetchReservations();
      setClickedStates((prev) => ({ ...prev, [reservationid]: false }));
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage mainpageAdminReservations">
        <div className="adminReservationsNavbar">
          <label htmlFor="reservationsSearch">Dátum:</label>
          <input
            type="date"
            id="reservationsSearch"
            name="reservationsSearch"
            value={selectedDate}
            onChange={handleSelectedDateChange}
            disabled={!searchByDate}
          />
          <label
            className="adminReservationsLabel"
            htmlFor="reservationsDateCheckBox"
          >
            Dátum szerint szűrés:
          </label>
          <input
            className="adminReservationsInput"
            type="checkbox"
            id="reservationsDateCheckBox"
            name="reservationsDateCheckBox"
            value={searchByDate}
            onChange={handleSearchByDateChange}
          />
        </div>
        <div className="adminReservationsBody">
          {Object.keys(groupedReservationForDisplay).length > 0 ? (
            Object.keys(groupedReservationForDisplay).map((resDate) => (
              <div key={resDate} className="adminReservationDate">
                <AdminReservation
                  dateForReservation={resDate}
                  clicked={clickedStates}
                  reservations={
                    groupedReservationForDisplay[resDate.toString()]
                  }
                  handleDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <p>
              {searchByDate
                ? "A megadott dátumra nincs foglalás!"
                : "Nincs foglalás a rendszerben!"}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AdminReservations;
