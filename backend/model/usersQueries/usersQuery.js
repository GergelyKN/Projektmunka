const pool = require("../pool");

async function postNewUser(user) {
  await pool.query(
    "INSERT INTO Users (firstname,lastname,email,hashedpassword,isadmin) VALUES ($1, $2, $3, $4, $5)",
    [
      user.regFirstName,
      user.regLastName,
      user.regEmail,
      user.regPassword,
      false,
    ]
  );
}

module.exports = { postNewUser };
