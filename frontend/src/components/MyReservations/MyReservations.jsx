import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import MyReservation from "./MyReservation";
import { useState, useEffect } from "react";

//Ha üres a lista, akkor azt kiírni, hogy nem található foglalás
function MyReservations() {
  const GETMYRESERVATION = import.meta.env.VITE_API_GETMYRESERVATION_URL;
  const DELETERESERVATIONAPI = import.meta.env
    .VITE_API_ADMIN_DELETERESERVATION_URL;

  const [selectedDate, setSelectedDate] = useState("");
  const [comparisonDate, setComparisonDate] = useState("");
  const [searchByDate, setSearchByDate] = useState(false);

  const [groupedReservations, setGroupedReservations] = useState([]);
  const [groupedReservationForDisplay, setGroupedReservationForDisplay] =
    useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const handleSelectedDateChange = (e) => {
    setSelectedDate(e.target.value);
    setComparisonDate(new Date(e.target.value).toLocaleDateString("hu-HU"));
  };
  const handleSearchByDateChange = (e) => {
    setSearchByDate(e.target.checked);
  };

  const fetchReservations = async (userID) => {
    try {
      const response = await fetch(
        `${GETMYRESERVATION}?userID=${encodeURIComponent(userID)}`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    if (storedUser) {
      setSelectedDate(new Date().toISOString().split("T")[0]);
      setComparisonDate(new Date().toLocaleDateString("hu-HU"));
      fetchReservations(storedUser["userid"]);
    }
  }, [GETMYRESERVATION]);

  useEffect(() => {
    if (groupedReservations) {
      if (searchByDate && selectedDate) {
        const AllRess = {};
        for (const [key, value] of Object.entries(groupedReservations)) {
          if (key === comparisonDate) {
            AllRess[key] = value;
          }
          setGroupedReservationForDisplay(AllRess);
        }
      } else {
        const AllRess = {};
        for (const [key, value] of Object.entries(groupedReservations)) {
          AllRess[key] = value;

          setGroupedReservationForDisplay(AllRess);
        }
      }
    }
  }, [selectedDate, searchByDate, comparisonDate, groupedReservations]);

  const handleDelete = async (reservationid) => {
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
      } else {
        alert(data.message);
        fetchReservations(storedUser["userid"]);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="reservationsNavBar">
        <label htmlFor="reservationsSearch">Dátum: </label>
        <input
          type="date"
          id="reservationsSearch"
          name="reservationsSearch"
          value={selectedDate}
          onChange={handleSelectedDateChange}
          disabled={!searchByDate}
        />
        <label htmlFor="reservationsDateCheckBox">Dátum: </label>
        <input
          type="checkbox"
          id="reservationsDateCheckBox"
          name="reservationsDateCheckBox"
          value={searchByDate}
          onChange={handleSearchByDateChange}
        />
      </div>
      <div className="reservationsBody">
        {Object.keys(groupedReservationForDisplay).length > 0 ? (
          Object.keys(groupedReservationForDisplay).map((resDate) => (
            <div
              key={resDate}
              className="reservationDate"
              style={{
                border: "1px solid green",
              }}
            >
              <h2>{resDate}</h2>
              <MyReservation
                reservations={groupedReservationForDisplay[resDate.toString()]}
                handleDelete={handleDelete}
              />
            </div>
          ))
        ) : !searchByDate ? (
          <p>Nem található foglalás a rendszerben!</p>
        ) : (
          <p>A mai napra nem található foglalás!</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyReservations;
