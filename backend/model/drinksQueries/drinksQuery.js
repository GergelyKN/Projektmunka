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
async function getDrinksWithStorage() {
  const { rows } = await pool.query(
    "SELECT drinks.*,drinkcategory.categoryname,drinkstorage.quantity FROM Drinks INNER JOIN drinkstorage ON drinks.drinkid = drinkstorage.drinkid INNER JOIN drinkcategory ON drinks.categoryid = drinkcategory.categoryid ORDER BY drinks.name"
  );
  return rows;
}

module.exports = { getAllDrinks, getAllDrinkCategories, getDrinksWithStorage };
