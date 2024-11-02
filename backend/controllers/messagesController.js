const db = require("../model/messagesQueries/messagesQuery");

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

    return res.status(201).json({ message: "Üzenet sikeresen rögzítve" });
  } catch (error) {
    console.error("Sikertelen rögzítés: ", error);
    return res
      .status(500)
      .json({ error: "Hiba történt az üzenet rögzítésekor" });
  }
}

module.exports = {
  postNewMessage,
};
