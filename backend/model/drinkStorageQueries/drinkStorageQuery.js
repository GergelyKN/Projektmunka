const pool = require("../pool");

async function updateDrink(drinkID, quantity) {
  try {
    const { rows } = await pool.query(
      "SELECT * from Drinkstorage WHERE drinkID = $1",
      [drinkID]
    );
    const currentQuantity = Number(rows[0].quantity);
    const updatedQuantity = currentQuantity + quantity;
    const { rowCount } = await pool.query(
      "UPDATE Drinkstorage SET quantity = $1 WHERE drinkID = $2",
      [updatedQuantity, drinkID]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt az ital frissítésekor:", err);
    throw err;
  }
}

module.exports = { updateDrink };
