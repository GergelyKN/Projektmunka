const db = require("../model/closedDateQueries/closedDateQuery");

async function getAllClosedDates(req, res) {
  try {
    const { rows } = await db.getAllClosedDates();
    res.status(200).json({ rows });
  } catch (err) {
    console.error("Hiba történt a zárt napok lekérdezése közben!");
    res
      .status(500)
      .json({ error: "Hiba történt a zárt napok lekérdezése közben!" });
  }
}

module.exports = { getAllClosedDates };