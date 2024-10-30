const db = require("../model/drinksQueries/drinksQuery");

async function drinksGet(req, res) {
  try {
    const drinks = await db.getAllDrinks();
    res.json(drinks);
  } catch (error) {
    console.error("Error fetching drinks:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { drinksGet };
