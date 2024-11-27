const pool = require("../pool");

async function getAllClosedDates() {
  try {
    const { rows } = await pool.query("SELECT * FROM closeddate");
    return { rows };
  } catch (err) {
    console.error("Hiba történt a zárt napok lekérdezése közben:", err);
    throw err;
  }
}

module.exports = { getAllClosedDates };
