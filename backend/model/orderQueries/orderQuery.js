const pool = require("../pool");

async function postOrder(order, reservationid) {
  try {
    const orderIdResult = await pool.query(
      "SELECT nextval('order_id_seq') AS orderid"
    );
    const orderId = orderIdResult.rows[0].orderid;

    const timestamp = new Date();

    for (const [drinkId, quantity] of Object.entries(order)) {
      await pool.query(
        `INSERT INTO Orders (OrderID, DrinkID, ReservationID, Quantity, Timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, drinkId, reservationid, quantity, timestamp]
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Hiba történt a rendelés rögzítésekor:", error);
    return { success: false };
  }
}

module.exports = { postOrder };