const pool = require("../pool");
async function getAllRoom() {
  try {
    const { rows } = await pool.query("SELECT * FROM roomprofile");
    if (rows.length === 0) {
      return { success: false };
    }
    return { success: true, rooms: rows };
  } catch (err) {
    console.error("Hiba történt a nyitvatartások lekérdezése közben:", err);
    throw err;
  }
}

async function postReservation(
  userID,
  roomID,
  dateForReservation,
  reservedFrom,
  reservedTo
) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO reservations (userID, roomID, date, reservedFrom, reservedTo) VALUES ($1, $2, $3, $4, $5)",
      [userID, roomID, dateForReservation, reservedFrom, reservedTo]
    );
    return { success: rowCount > 0 };
  } catch (err) {
    console.error("Hiba történt a foglalás rögzítése közben: ", err);
    throw err;
  }
}

async function getReservationsByDate(date, roomID) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM reservations WHERE date = $1 AND roomid = $2 ORDER BY reservedfrom",
      [date, roomID]
    );
    return { reservations: rows };
  } catch (err) {
    console.error("Hiba történt a foglalások lekérdezése közben:", err);
    throw err;
  }
}

async function getReservationsByUserID(userID) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM reservations WHERE userid = $1 ORDER BY date DESC, reservedfrom DESC",
      [userID]
    );
    return { rows };
  } catch (err) {
    console.error("Hiba történt a foglalások lekérdezése közben:", err);
    throw err;
  }
}

module.exports = {
  getAllRoom,
  postReservation,
  getReservationsByDate,
  getReservationsByUserID,
};
