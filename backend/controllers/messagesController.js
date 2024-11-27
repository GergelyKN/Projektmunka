const db = require("../model/messagesQueries/messagesQuery");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function postNewMessage(req, res) {
  const { ContactFirstName, ContactLastName, ContactEmail, ContactText } =
    req.body;

  if (!ContactFirstName || !ContactLastName || !ContactEmail || !ContactText) {
    return res.status(400).json({ error: "Hiányzó mezők" });
  }
  try {
    await db.postNewMessage({
      ContactFirstName,
      ContactLastName,
      ContactEmail,
      ContactText,
    });

    await sendEmail(
      ContactText,
      ContactEmail,
      ContactLastName,
      ContactFirstName
    );

    return res.status(201).json({ message: "Üzenet sikeresen rögzítve" });
  } catch (error) {
    console.error("Sikertelen rögzítés: ", error);
    return res
      .status(500)
      .json({ error: "Hiba történt az üzenet rögzítésekor" });
  }
}

async function sendEmail(message, email, lastname, firstname) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Új üzenet érkezett ${lastname} ${firstname}-tól/től`,
    text: `${email} címről érkezett az alábbi üzenet:\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sikeresen elküldve!");
  } catch (err) {
    console.error("Email küldési hiba: ", err);
  }
}

module.exports = {
  postNewMessage,
};
