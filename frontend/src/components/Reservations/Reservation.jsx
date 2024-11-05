import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Reservation() {
  const [dateForReservation, setDateForReservation] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startHour, setStartHour] = useState("10");
  const [endHour, setEndHour] = useState("11");

  const handleDateChange = (event) => {
    setDateForReservation(event.target.value);
  };

  const handleStartDate = (event) => {
    setStartHour(event.target.value);
  };

  const handleEndDate = (event) => {
    setEndHour(event.target.value);
  };

  //Dummy adat próbaként, később db-ből lekérdezés
  const rooms = [
    { roomID: 1, capacity: 10 },
    { roomID: 2, capacity: 8 },
    { roomID: 3, capacity: 5 },
    { roomID: 4, capacity: 5 },
  ];
  const availableHours = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0o0,
  ];
  const startHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const endHours = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0o0];

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user) {
    return <Navigate to="/bejelentkezes" />;
  }

  return (
    <>
      <NavBar />
      <h3>Foglalás menüpont</h3>
      <div className="reservationNavBar">
        <label htmlFor="roomSelect">Szobaszám: </label>
        <select name="roomSelect" id="roomSelect">
          {rooms.map((room) => (
            <option key={room.roomID} value={room.roomID}>
              {room.roomID + ". szoba - " + room.capacity + " fő"}
            </option>
          ))}
        </select>
        <label htmlFor="reservationDate">Foglalás dátuma: </label>
        <input
          type="date"
          id="reservationDate"
          name="reservationDate"
          value={dateForReservation}
          onChange={handleDateChange}
          min={"2024-01-01"}
          max={"2024-12-31"}
        />
        <p>{dateForReservation}</p>
      </div>
      <div className="reservationContainer">
        <div className="reservationTable">
          <div className="reservationTableHeader">
            <label htmlFor="reservationStartHour">Kezdőóra: </label>
            <select
              name="reservationStartHour"
              id="reservationStartHour"
              onChange={handleStartDate}
            >
              {startHours.map((startHour) => (
                <option key={startHour} value={startHour}>
                  {startHour + ":00"}
                </option>
              ))}
            </select>

            <label htmlFor="reservationEndHour">Végóra: </label>
            <select
              name="reservationEndHour"
              id="reservationEndHour"
              onChange={handleEndDate}
            >
              {endHours.map((endHour) => (
                <option key={endHour} value={endHour}>
                  {endHour !== 0 ? endHour + ":00" : endHour + "0:00"}
                </option>
              ))}
            </select>
            <p>
              {endHour < startHour ? (
                <strong>
                  A kezdőóra nem lehet nagyobb, mint a záró óra...
                </strong>
              ) : (
                startHour + ":00 - " + endHour + ":00"
              )}
            </p>
          </div>
          <div className="reservationTableContent">
            <table>
              <thead>
                <tr>
                  <th>Időpont</th>
                </tr>
              </thead>
              <tbody>
                {availableHours.map((hour) => {
                  const isWithinRange = hour >= startHour && hour <= endHour;
                  return (
                    <tr
                      key={hour}
                      value={hour}
                      style={{
                        backgroundColor: isWithinRange
                          ? "lightgreen"
                          : "transparent",
                        color: isWithinRange ? "white" : "black",
                      }}
                    >
                      {hour === 0 ? hour + "0:00" : hour + ":00"}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Reservation;
