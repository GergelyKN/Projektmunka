const pool = require("../pool");
async function getAllOpenInfos(params) {
  try {
    const { rows } = await pool.query("SELECT * FROM openhours");

    if (rows.length === 0) {
      return { success: false, rows };
    }
    return { success: true, rows };
  } catch (err) {
    console.error("Hiba történt a nyitvatartás lekérdezése közben:", err);
    throw err;
  }
}
async function getOpenInfoByDay(day) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM openhours WHERE day = $1",
      [day]
    );
    return { specificDay: rows };
  } catch (err) {
    console.error("Hiba történt a nyitvatartás lekérdezése közben:", err);
    throw err;
  }
}

module.exports = { getAllOpenInfos, getOpenInfoByDay };
