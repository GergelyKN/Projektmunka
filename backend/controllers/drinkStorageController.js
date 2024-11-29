const db = require("../model/drinkStorageQueries/drinkStorageQuery");

async function updateDrink(req, res) {
  const { drinkID, quantity } = req.body;
  if (!drinkID || !quantity) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.updateDrink(drinkID, quantity);
    if (!success) {
      return res.status(404).json({ error: "Nem található az ital!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Hiba történt a raktár frissítésekor!: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a raktár frissítésekor!" });
  }
}

module.exports = { updateDrink };
