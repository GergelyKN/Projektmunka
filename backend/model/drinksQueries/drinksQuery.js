const pool = require("../pool");

async function getAllDrinks() {
  const { rows } = await pool.query(
    "SELECT drinks.*, drinkcategory.categoryname FROM Drinks JOIN drinkcategory ON drinks.categoryid = drinkcategory.categoryid"
  );
  return rows;
}

async function getAllDrinkCategories() {
  const { rows } = await pool.query("SELECT * FROM drinkcategory");
  return rows;
}
module.exports = { getAllDrinks, getAllDrinkCategories };
