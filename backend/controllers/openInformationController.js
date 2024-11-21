const db = require("../model/openInformationQueries/openInformationQuery");

async function getAllOpenInfos(req, res) {
  try {
    const { success, rows } = await db.getAllOpenInfos();

    if (!success) {
      return res.status(404).json({ error: "Nem található nyitvatartás!" });
    }

    return res.status(200).json({ rows });
  } catch (error) {
    console.error("Hiba történt a nyitvatartás lekérdezése közben!");
    return res
      .status(500)
      .json({ error: "Hiba történt a nyitvatartás lekérdezése közben!" });
  }
}
async function getOpenInfoByDay(req, res) {
  const { day } = req.query;

  if (!day) {
    return res.status(400).json({ error: "Hiányzó nap!" });
  }
  try {
    const { specificDay } = await db.getOpenInfoByDay(day);
    return res.status(200).json({ specificDay });
  } catch (err) {
    console.error("Hiba történt a lekérdezés közben: ", err);
    return res.status(500).json({ error: "Hiba történt a lekérdezés közben!" });
  }
}

module.exports = { getAllOpenInfos, getOpenInfoByDay };
