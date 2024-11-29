const db = require("../model/drinksQueries/drinksQuery");

async function drinksGet(req, res) {
  try {
    const drinks = await db.getAllDrinks();
    res.status(200).json(drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    res.status(500).send("Internal Server Error");
  }
}
async function getDrinkCategories(req, res) {
  try {
    const categories = await db.getAllDrinkCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Hiba történt a kategóriák lekérdezése közben");
    return res
      .status(500)
      .json({ error: "Hiba történt a kategóriák lekérdezése közben" });
  }
}

async function getDrinksWithStorage(req, res) {
  try {
    const drinks = await db.getDrinksWithStorage();
    res.status(200).json(drinks);
  } catch (error) {
    console.error("Hiba történt az italok lekérdezése közben:", error);
    res.status(500).send("Hiba történt az italok lekérdezése közben");
  }
}

module.exports = { drinksGet, getDrinkCategories, getDrinksWithStorage };
