const pool = require("../pool");

async function postNewUser(user) {
  await pool.query(
    "INSERT INTO Users (firstname,lastname,email,hashedpassword,isadmin) VALUES ($1, $2, $3, $4, $5)",
    [
      user.regFirstName,
      user.regLastName,
      user.regEmail,
      user.hashedPassword,
      false,
    ]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM Users WHERE email = $1 ", [
    email,
  ]);
  return rows;
}

module.exports = { postNewUser, getUserByEmail };
