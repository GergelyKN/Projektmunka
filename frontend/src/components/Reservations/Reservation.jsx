import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import getDayOfWeek from "../../functions/Reservation_Functions/ReservationHelperFunctions";
import { useState, useEffect } from "react";

//Bugos, 23:00 és 01:00 között, átalakítani a date inputot HU-hu formára, majd azt összehasonlítani/elküldeni

function Reservation() {
  const GETROOMAPI = import.meta.env.VITE_API_RESERVATION_GETROOMS_URL;
  const GETOPENINFOSAPI = import.meta.env.VITE_API_OPENINFOS_URL;
  const POSTRESERVATIONAPI = import.meta.env.VITE_API_POSTRESERVATION_URL;
  const GETRESERVATIONSBYDATEAPI = import.meta.env
    .VITE_API_GETRESERVATIONSBYDATE_URL;
  const GETOPENINFOBYDAYAPI = import.meta.env.VITE_API_GETOPENINFOBYDAY_URL;
  const GETCLOSEDDATESAPI = import.meta.env.VITE_API_GETCLOSEDDATES_URL;
  const GETMYRESERVATION = import.meta.env.VITE_API_GETMYRESERVATION_URL;

  const [dateForReservation, setDateForReservation] = useState("");
  const [startHour, setStartHour] = useState();
  const [endHour, setEndHour] = useState();

  const [startHours, setStartHours] = useState([]);
  const [endHours, setEndHours] = useState([]);
  const [groupedHours, setGroupedHours] = useState([]);

  const [rooms, setRooms] = useState([]);
  const [roomID, setRoomID] = useState();
  const [groupedInfos, setGroupedInfos] = useState();

  const [reservationsByDate, setReservationsByDate] = useState();
  const [reservedStartHours, setReservedStartHours] = useState([]);
  const [reservedEndHours, setReservedEndHours] = useState([]);

  const [myGroupedReservations, setMyGroupedReservations] = useState([]);

  const [openInfoByDay, setOpenInfoByDay] = useState();

  const [closedDates, setClosedDates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [alreadyHaveReservation, setAlreadyHaveReservation] = useState(false);
  const [clicked, setClicked] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleDateChange = (event) => {
    setDateForReservation(event.target.value);
  };

  const handleStartHour = (event) => {
    setStartHour(Number(event.target.value));
  };

  const handleEndHour = (event) => {
    setEndHour(Number(event.target.value));
  };
  const hanldeRoomIDChange = (event) => {
    setRoomID(Number(event.target.value));
  };

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
        const data = await response.json();

        for (const reservation of data["rows"]) {
          reservation["date"] = new Date(
            reservation["date"]
          ).toLocaleDateString("hu-HU");
        }
        setClosedDates(data["rows"].map((x) => x.date));
      } catch (err) {
        console.error("Hiba történt a foglalások lekérdezése közben: ", err);
      }
    };
    fetchClosedDates();
  }, [GETCLOSEDDATESAPI]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(GETROOMAPI, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        const roomsObject = data["rooms"].reduce((acc, room) => {
          acc[room.roomid] = room.capacity;
          return acc;
        }, {});
        setRooms(roomsObject);
        if (!response.ok) {
          console.error("Hibaüzenet a szerver felől:", data.error);
        }
      } catch (err) {
        console.error("Hiba történt a kapcsolódáskor: ", err);
      }
    };
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
          acc[openinfo.day] = {
            startHour: Number(openinfo.starthour),
            endHour: Number(openinfo.endhour),
          };
          return acc;
        }, {});
        setGroupedInfos(openInfosObject);
      } catch (err) {
        console.error("Hiba történt a nyitvatartés lekérdezése közben: ", err);
      }
    };

    fetchRooms();
    fetchOpenInfos();
  }, [GETOPENINFOSAPI, GETROOMAPI]);

  useEffect(() => {
    setDateForReservation(new Date().toISOString().split("T")[0]);
  }, [groupedInfos]);

  const fetchReservationsByDate = async (dateForReservation, roomID) => {
    try {
      const url = `${GETRESERVATIONSBYDATEAPI}?date=${encodeURIComponent(
        dateForReservation
      )}&roomID=${encodeURIComponent(roomID)}`;

      const response = await fetch(url, {
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

      setReservationsByDate(data);
    } catch (err) {
      console.error(
        "Hiba történt a foglalt időpontok lekérdezése közben: ",
        err
      );
    }
  };
  const fetchOpenInfoByDay = async (day) => {
    try {
      const url = `${GETOPENINFOBYDAYAPI}?day=${encodeURIComponent(day)}`;

      const response = await fetch(url, {
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
      setOpenInfoByDay(data);
    } catch (err) {
      console.error("Hiba történt a nyitvatartás lekérdezése közben: ", err);
    }
  };

  useEffect(() => {
    if (dateForReservation && roomID) {
      setLoading(true);
      setReservedStartHours([]);
      setReservedEndHours([]);

      Promise.all([
        fetchReservationsByDate(dateForReservation, roomID),
        fetchOpenInfoByDay(getDayOfWeek(dateForReservation)),
      ]).then(() => setLoading(false));
    }
  }, [dateForReservation, roomID]);

  useEffect(() => {
    if (reservationsByDate) {
      const resStartHelper = [];
      const resEndHelper = [];

      for (const reservation of reservationsByDate["reservations"]) {
        const start = Number(reservation["reservedfrom"]);
        const end = Number(reservation["reservedto"]);
        const userID = reservation["userid"];

        for (let i = start; i <= end; i++) {
          if (i === start) {
            resStartHelper.push({ hour: i, userid: userID });
          } else if (i === end) {
            resEndHelper.push({ hour: i, userid: userID });
          } else {
            resStartHelper.push({ hour: i, userid: userID });
            resEndHelper.push({ hour: i, userid: userID });
          }
        }
      }

      setReservedStartHours(resStartHelper);
      setReservedEndHours(resEndHelper);
    }
  }, [reservationsByDate]);

  useEffect(() => {
    if (dateForReservation && openInfoByDay) {
      const fromHour = Number(openInfoByDay["specificDay"][0]["starthour"]);
      const toHour = Number(openInfoByDay["specificDay"][0]["endhour"]);

      const aHours = [];
      for (let i = fromHour; i <= toHour; ++i) {
        aHours.push(i);
      }

      setStartHours(aHours.slice(0, aHours.length - 1));
      setEndHours(aHours.slice(1));
    }
  }, [dateForReservation, openInfoByDay]);

  useEffect(() => {
    if (startHours.length > 0 && endHours.length > 0) {
      setStartHour(Number(startHours[0]));
      setEndHour(Number(endHours[0]));
      const groupedHoursHelper = [];
      const today = new Date().toISOString().split("T")[0];
      const currentHour = new Date().getHours();

      for (let i = 0; i < startHours.length; i++) {
        const reservedStartObj = reservedStartHours.find(
          (reserved) => reserved.hour === startHours[i]
        );
        const reservedEndObj = reservedEndHours.find(
          (reserved) => reserved.hour === endHours[i]
        );

        groupedHoursHelper.push({
          sHour: startHours[i],
          eHour: endHours[i],
          isReserved: !!reservedStartObj && !!reservedEndObj,
          userID: reservedEndObj ? reservedEndObj.userid : null,
          isInThePast:
            dateForReservation < today ||
            (dateForReservation === today && startHours[i] <= currentHour),
        });
      }

      setGroupedHours(groupedHoursHelper);
    } else {
      setGroupedHours([]);
    }
  }, [
    startHours,
    endHours,
    reservedEndHours,
    reservedStartHours,
    dateForReservation,
  ]);

  useEffect(() => {
    if (groupedHours.length > 0) {
      const StartAvailableHour = groupedHours.find(
        (hour) => !hour.isReserved && !hour.isInThePast
      );
      if (StartAvailableHour) {
        setStartHour(StartAvailableHour.sHour);
        setEndHour(StartAvailableHour.sHour + 1);
      }
    }
  }, [groupedHours, dateForReservation]);

  useEffect(() => {
    if (rooms) {
      setRoomID(Number(Object.keys(rooms)[0]));
    }
  }, [rooms]);

  useEffect(() => {
    const fetchMyReservations = async (userID) => {
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

        setMyGroupedReservations(groupedData);
      } catch (err) {
        console.error("Hiba történt a foglalások lekérdezése közben: ", err);
      }
    };
    fetchMyReservations(user.userid);
  }, [dateForReservation, reservationsByDate, GETMYRESERVATION, user.userid]);

  useEffect(() => {
    if (Object.keys(myGroupedReservations).length > 0 && dateForReservation) {
      setAlreadyHaveReservation(
        Object.keys(myGroupedReservations).includes(
          new Date(dateForReservation).toLocaleDateString("hu-HU")
        )
      );
    }
  }, [myGroupedReservations, dateForReservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    try {
      const response = await fetch(POSTRESERVATIONAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userID: Number(user["userid"]),
          roomID: Number(roomID),
          dateForReservation,
          reservedFrom: Number(startHour),
          reservedTo: Number(endHour),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Hiba történt a kapcsolódáskor: ", error);
    } finally {
      fetchReservationsByDate(dateForReservation, roomID);
      setClicked(false);
    }
  };

  return (
    <>
      <NavBar />
      <h3>Foglalás menüpont</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="roomSelect">Szobaszám: </label>
          <select
            name="roomSelect"
            id="roomSelect"
            onChange={hanldeRoomIDChange}
          >
            {Object.entries(rooms).map(([key, value]) => (
              <option key={key} value={key}>
                {key + ". Szoba - " + value + " Fő"}
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
            max={"2025-02-28"}
          />

          <div className="reservationTable">
            <div className="reservationTableHeader">
              <label htmlFor="reservationStartHour">Kezdőóra: </label>
              <select
                name="reservationStartHour"
                id="reservationStartHour"
                onChange={handleStartHour}
                value={startHour}
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
                onChange={handleEndHour}
                value={endHour}
              >
                {endHours.map((endHour) => (
                  <option key={endHour} value={endHour}>
                    {endHour + ":00"}
                  </option>
                ))}
              </select>
              <>
                {closedDates.includes(
                  new Date(dateForReservation).toLocaleDateString("hu-HU")
                ) ? (
                  <h2>Ezen a napon zárva tartunk!</h2>
                ) : dateForReservation <
                  new Date().toISOString().split("T")[0] ? (
                  <h2>Nem lehet múltbeli időpontot lefoglalni</h2>
                ) : startHour >= endHour ? (
                  <h2>
                    A kezdőóra nem lehet nagyobb vagy egyenlő, mint a záró
                    óra...
                  </h2>
                ) : groupedHours.every((x) => x.isReserved || x.isInThePast) ? (
                  <h2>A mai napon már minden időpont foglalt!</h2>
                ) : reservedStartHours.map((x) => x.hour).includes(startHour) ||
                  reservedEndHours.map((x) => x.hour).includes(endHour) ? (
                  <h2>A kijelölt időpont már foglalt!</h2>
                ) : dateForReservation ===
                    new Date().toISOString().split("T")[0] &&
                  startHour < new Date().getHours() ? (
                  <h2>
                    Nem lehet olyan időpontot kijelölni, ami{" "}
                    {new Date().getHours() +
                      ":" +
                      (new Date().getMinutes() < 10
                        ? "0" + new Date().getMinutes()
                        : new Date().getMinutes())}{" "}
                    előtt van!
                  </h2>
                ) : alreadyHaveReservation ? (
                  <h2>A mai napra már van foglalásod!</h2>
                ) : null}
              </>
            </div>
            {!loading &&
            !closedDates.includes(
              new Date(dateForReservation).toLocaleDateString("hu-HU")
            ) ? (
              <div className="reservationTableContent">
                <table>
                  <thead>
                    <tr>
                      <th>Időpont</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Színmagyarázat: </td>
                      <td>
                        <div style={{ backgroundColor: "red", color: "white" }}>
                          Foglalt
                        </div>
                        <div
                          style={{ backgroundColor: "blue", color: "white" }}
                        >
                          Saját foglalás
                        </div>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                        >
                          Szabad
                        </div>
                        <div
                          style={{
                            backgroundColor: "lightgreen",
                            color: "white",
                          }}
                        >
                          Aktuális kijelölés
                        </div>
                      </td>
                    </tr>
                    {groupedHours.map((hour) => {
                      const isWithinRange =
                        startHour < endHour &&
                        hour["sHour"] >= startHour &&
                        hour["eHour"] <= endHour;

                      const style = hour.isInThePast
                        ? { textDecoration: "line-through" }
                        : {
                            backgroundColor:
                              hour["userID"] === user.userid
                                ? "blue"
                                : hour["isReserved"]
                                ? "red"
                                : isWithinRange
                                ? "lightgreen"
                                : "transparent",
                            color:
                              hour["isReserved"] || isWithinRange
                                ? "white"
                                : "black",
                          };

                      return (
                        <tr key={hour["sHour"]}>
                          <td value={hour} style={style}>
                            {hour["sHour"] + ":00 - " + hour["eHour"] + ":00"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!loading ? (
                  !clicked ? (
                    <button
                      type="submit"
                      disabled={
                        closedDates.includes(
                          new Date(dateForReservation).toLocaleDateString(
                            "hu-HU"
                          )
                        ) ||
                        alreadyHaveReservation ||
                        startHour >= endHour ||
                        reservedStartHours.some((x) => x.hour === startHour) ||
                        reservedEndHours.some((x) => x.hour === endHour) ||
                        new Date(dateForReservation) <
                          new Date(new Date().toISOString().split("T")[0]) ||
                        (dateForReservation ===
                          new Date().toISOString().split("T")[0] &&
                          startHour < new Date().getHours())
                      }
                    >
                      Elküldés
                    </button>
                  ) : (
                    <p>Foglalás feldolgozás alatt...</p>
                  )
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
        </fieldset>
      </form>
      <Footer />
    </>
  );
}

export default Reservation;
