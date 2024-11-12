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
async function updateUser(email, newemail, newHashedpassword) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE users SET email = $1, hashedpassword = $2 WHERE email = $3 `,
      [newemail, newHashedpassword, email]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a felhasználó frissítésekor:", err);
    throw err;
  }
}

module.exports = { postNewUser, getUserByEmail, updateUser };
