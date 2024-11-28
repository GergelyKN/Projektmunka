import { useEffect, useState, useMemo, createContext } from "react";
import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useNavigate } from "react-router-dom";

export const ReservationIDContext = createContext(null);

function RoomRoute({ children }) {
  const GETMYRESERVATION = import.meta.env.VITE_API_GETMYRESERVATION_URL;
  const navigate = useNavigate();

  const user = useMemo(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }, []);

  const [groupedReservation, setGroupedReservation] = useState({});
  const [activeReservationUser, setActiveReservationuser] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [activeReservation, setActiveReservation] = useState(true);
  const [loading, setLoading] = useState(true);
  const [ResID, setReservationID] = useState(null);
  const [currentHourForLogout, setCurrentHourForLogout] = useState(
    new Date().getHours()
  );

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("quantitiesToSend");
    alert("Köszönjük, hogy nálunk társasozott!");
    navigate("/");
  };
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        const newHour = new Date().getHours();
        const newMinute = new Date().getMinutes();
        if (
          newHour === Number(Number(activeReservationUser["reservedfrom"])) &&
          newMinute === 59
        ) {
          handleLogOut();
        } else {
          setCurrentHourForLogout(newHour);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentHourForLogout, activeReservationUser, loading]);

  const today = new Date().toLocaleDateString("hu-HU");

  useEffect(() => {
    const interval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== currentHour) {
        setCurrentHour(newHour);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentHour]);

  useEffect(() => {
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
          reservation["date"] = new Date(
            reservation["date"]
          ).toLocaleDateString("hu-HU");
        }
        const groupedData = data["rows"].reduce((acc, reservation) => {
          if (!acc[reservation.date]) {
            acc[reservation.date] = [];
          }
          acc[reservation.date].push(reservation);
          return acc;
        }, {});
        setGroupedReservation(groupedData);
      } catch (err) {
        console.error("Hiba történt a foglalások lekérdezése közben: ", err);
      }
    };
    Promise.all([fetchReservations(user.userid)]).then(() => setLoading(false));
  }, [user, GETMYRESERVATION]);

  useEffect(() => {
    if (loading) return;

    if (Object.keys(groupedReservation).length > 0) {
      if (
        Object.keys(groupedReservation).includes(today) &&
        groupedReservation[today][0]["reservedfrom"] <= currentHour &&
        groupedReservation[today][0]["reservedto"] >= currentHour
      ) {
        setActiveReservation(true);
        setActiveReservationuser(groupedReservation[today][0]);
        setReservationID(Number(groupedReservation[today][0]["reservationid"]));
      } else {
        setActiveReservation(false);
      }
    } else {
      setActiveReservation(false);
    }
  }, [groupedReservation, currentHour, today, loading]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (!loading) {
    if (!activeReservation) {
      return (
        <>
          <NavBar />
          <h4>Jelenleg nincs aktív foglalásod</h4>
          <button onClick={handleClick}>Elfogadás</button>
          <Footer />
        </>
      );
    }

    return (
      <ReservationIDContext.Provider value={ResID}>
        {children}
      </ReservationIDContext.Provider>
    );
  }
}

export default RoomRoute;
