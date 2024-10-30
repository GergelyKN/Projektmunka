const db = require("../model/messagesQueries/messagesQuery");

async function postNewMessage(req, res) {
  const { ContactFirstName, ContactLastName, ContactEmail, ContactText } =
    req.body;

  if (!ContactFirstName || !ContactLastName || !ContactEmail || !ContactText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  await db.postNewMessage({
    ContactFirstName,
    ContactLastName,
    ContactEmail,
    ContactText,
  });

  res.status(201).json({ message: "Message saved successfully" });
}

module.exports = {
  postNewMessage,
};
