const pool = require("../pool");

async function postNewMessage(message) {
  await pool.query(
    "INSERT INTO Messages (FirstName, LastName, Email, Message) VALUES ($1, $2, $3, $4)",
    [
      message.ContactFirstName,
      message.ContactLastName,
      message.ContactEmail,
      message.ContactText,
    ]
  );
}
module.exports = { postNewMessage };
