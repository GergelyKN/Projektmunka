import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import MyReservation from "./MyReservation";
import { dateComparison } from "../../functions/Reservation_Functions/ReservationHelperFunctions";
import { useState, useEffect, useMemo } from "react";
import "./MyReservations.css";

function MyReservations() {
  const GETMYRESERVATIONAPI = import.meta.env.VITE_API_GETMYRESERVATION_URL;
  const DELETERESERVATIONAPI = import.meta.env
    .VITE_API_ADMIN_DELETERESERVATION_URL;

  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [searchByDate, setSearchByDate] = useState(false);
  const [groupedReservations, setGroupedReservations] = useState({});
  const [clickedStates, setClickedStates] = useState({});

  const storedUser = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const handleSelectedDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSearchByDateChange = (e) => {
    setSearchByDate(e.target.checked);
  };
  const fetchReservations = async (userID) => {
    try {
      const response = await fetch(
        `${GETMYRESERVATIONAPI}?userID=${encodeURIComponent(userID)}`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Szerver Error");
      }
      const data = await response.json();

      const formattedReservations = data["rows"].map((reservation) => ({
        ...reservation,
        date: new Date(reservation.date).toLocaleDateString("hu-HU"),
      }));

      const groupedData = formattedReservations.reduce((acc, reservation) => {
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
    if (storedUser) {
      fetchReservations(storedUser.userid);
    }
  }, [GETMYRESERVATIONAPI, storedUser]);

  const groupedReservationForDisplay = useMemo(() => {
    if (searchByDate && selectedDate) {
      const filtered = {};
      for (const [date, reservations] of Object.entries(groupedReservations)) {
        if (date === new Date(selectedDate).toLocaleDateString("hu-HU")) {
          filtered[date] = reservations;
        }
      }
      return filtered;
    }
    return groupedReservations;
  }, [selectedDate, searchByDate, groupedReservations]);

  const handleDelete = async (reservationid) => {
    if (
      dateComparison(
        Object.values(groupedReservationForDisplay)
          .map((x) => x[0])
          .filter(
            (reservation) => reservation.reservationid === reservationid
          )[0]["date"],
        new Date().toLocaleDateString("hu-HU")
      )
    ) {
      alert("Nem lehet múltbeli/aznapi időpontot törölni!");
    } else {
      setClickedStates((prev) => ({ ...prev, [reservationid]: true }));
      try {
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
        alert("Sikeres törlés!");
      } catch (err) {
        console.error("Hiba történt a kapcsolódáskor: ", err);
      } finally {
        await fetchReservations(storedUser.userid);
        setClickedStates((prev) => ({ ...prev, [reservationid]: false }));
      }
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage mainpageMyReservations">
        <div className="MyreservationsNavBar">
          <label htmlFor="reservationsSearch">Dátum: </label>
          <input
            type="date"
            id="reservationsSearch"
            name="reservationsSearch"
            value={selectedDate}
            onChange={handleSelectedDateChange}
            disabled={!searchByDate}
          />

          <label
            className="myReservationLabel"
            htmlFor="reservationsDateCheckBox"
          >
            Dátum szerint szűrés:
          </label>
          <input
            className="myReservationInput"
            type="checkbox"
            id="reservationsDateCheckBox"
            name="reservationsDateCheckBox"
            checked={searchByDate}
            onChange={handleSearchByDateChange}
          />
        </div>

        <div className="reservationsBody">
          {Object.keys(groupedReservationForDisplay).length > 0 ? (
            Object.entries(groupedReservationForDisplay).map(([key, value]) => (
              <div key={key} className="reservationDate">
                <MyReservation
                  dateForReservation={key}
                  clicked={clickedStates}
                  reservations={groupedReservationForDisplay[key]}
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

export default MyReservations;
