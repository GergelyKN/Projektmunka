const db = require("../model/reservationQueries/reservationQuery");
const nodemailer = require("nodemailer");

async function sendEmail(date, roomNumber, from, to) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TOEMAIL,
    subject: `Sikeres foglalás!`,
    text: `
A ${date} napon ${from}:00-tól ${to}:00-ig
${roomNumber}. szobába történt foglalása mentésre került!

Várjuk sok szeretettel,
TableTop Bár Vezetőség
    `,
    replyTo: process.env.EMAIL,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sikeresen elküldve!");
  } catch (err) {
    console.error("Email küldési hiba: ", err);
  }
}

async function getAllRoom(req, res) {
  try {
    const { success, rooms } = await db.getAllRoom();
    if (!success) {
      return res.status(404).json({ error: "Nem található szoba!" });
    }
    return res.status(200).json({ rooms });
  } catch (err) {
    console.error("Hiba történt a lekérdezés közben: ", err);
    return res.status(500).json({ error: "Hiba történt a lekérdezés közben!" });
  }
}

async function postReservation(req, res) {
  const { userID, roomID, dateForReservation, reservedFrom, reservedTo } =
    req.body;
  if (
    !userID ||
    !roomID ||
    !dateForReservation ||
    !reservedFrom ||
    !reservedTo
  ) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }

  try {
    const { success } = await db.postReservation(
      Number(userID),
      Number(roomID),
      new Date(dateForReservation).toISOString().split("T")[0],
      Number(reservedFrom),
      Number(reservedTo)
    );
    if (success) {
      await sendEmail(
        new Date(dateForReservation).toLocaleDateString("hu-HU"),
        roomID,
        reservedFrom,
        reservedTo
      );
      return res.status(200).json({ message: "Sikeres foglalás!" });
    }
    return res.status(500).json({ error: "Hiba történt a foglalás során" });
  } catch (err) {
    console.error("Foglalási hiba: ", err);
    return res.status(500).json({ error: "Belső szerverhiba" });
  }
}

async function getReservationsByDate(req, res) {
  const { date, roomID } = req.query;

  if (!date || !roomID) {
    return res.status(400).json({ error: "Hiányzó adatok!" });
  }
  try {
    const { reservations } = await db.getReservationsByDate(
      date,
      Number(roomID)
    );
    return res.status(200).json({ reservations });
  } catch (err) {
    console.error("Hiba történt a lekérdezés közben: ", err);
    return res.status(500).json({ error: "Hiba történt a lekérdezés közben!" });
  }
}

async function getReservationsByUserID(req, res) {
  const { userID } = req.query;
  if (!userID) {
    return res.status(400).json({ error: "Hiányzó adatok!" });
  }
  try {
    const { rows } = await db.getReservationsByUserID(userID);
    if (rows.length < 0) {
      return res.status(404).json({ error: "Nem található foglalás" });
    }
    return res.status(200).json({ rows });
  } catch (err) {
    console.error("Hiba történt a foglalások lekérdezése közben!");
    return res
      .status(500)
      .json({ error: "Hiba történt a foglalások lekérdezése közben!" });
  }
}

module.exports = {
  getAllRoom,
  postReservation,
  getReservationsByDate,
  getReservationsByUserID,
};
