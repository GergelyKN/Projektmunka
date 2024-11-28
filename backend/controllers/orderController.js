const db = require("../model/orderQueries/orderQuery");

async function postOrder(req, res) {
  const { order, reservationid } = req.body;
  if (!order || !reservationid) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.postOrder(order, reservationid);

    if (success) {
      return res.status(200).json({ message: "Rendelés sikeresen leadva!" });
    } else {
      return res.status(500).json({
        error: "Hiba történt a rendelés leadása közben!",
      });
    }
  } catch (err) {
    console.error("Sikertelen rendelés leadás: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a rendelés leadása közben!" });
  }
}

module.exports = { postOrder };