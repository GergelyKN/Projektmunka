const pool = require("../pool");

async function updatrDrinkstorage(drinkID, quantity) {
  const { rows } = await pool.query(
    "SELECT * from Drinkstorage WHERE drinkID = $1",
    [drinkID]
  );
  const currentQuantity = Number(rows[0].quantity);
  const updatedQuantity = currentQuantity - quantity;
  await pool.query("UPDATE Drinkstorage SET quantity = $1 WHERE drinkID = $2", [
    updatedQuantity,
    drinkID,
  ]);
}

async function postOrder(order, reservationid) {
  try {
    const orderIdResult = await pool.query(
      "SELECT nextval('order_id_seq') AS orderid"
    );
    const orderId = orderIdResult.rows[0].orderid;

    const timestamp = new Date();

    for (const [drinkID, quantity] of Object.entries(order)) {
      await pool.query(
        `INSERT INTO Orders (OrderID, DrinkID, ReservationID, Quantity, Timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, drinkID, reservationid, quantity, timestamp]
      );
      await updatrDrinkstorage(drinkID, quantity);
    }

    return { success: true };
  } catch (error) {
    console.error("Hiba történt a rendelés rögzítésekor:", error);
    return { success: false };
  }
}

module.exports = { postOrder };
