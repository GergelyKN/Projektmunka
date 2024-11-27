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
    const newDate = new Date();

    let isoString = newDate.toISOString();

    const micros = newDate.getMilliseconds() * 1000;

    let postgresDate = isoString
      .replace("T", " ")
      .replace("Z", "")
      .replace(/\.\d+$/, `.${micros}`);
    console.log(postgresDate);

    const { rowCount } = await pool.query(
      `UPDATE users SET email = $1, hashedpassword = $2, updatedat = $3 WHERE email = $4 `,
      [newemail, newHashedpassword, postgresDate, email]
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

async function resetPassword(email, generatedPassword) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE users.email = $1",
      [email]
    );
    if (rows) {
      const { rowCount } = await pool.query(
        "UPDATE users SET hashedpassword = $1 WHERE email = $2",
        [generatedPassword, email]
      );
      if (rowCount === 0) {
        return { success: false };
      }
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Hiba történt a jelszó frissítésekor: ", err);
    throw err;
  }
}

async function deleteUser(userID) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM users WHERE userid = $1",
      [userID]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a felhasználó törlésekor:", err);
    throw err;
  }
}
async function getUsers() {
  const { rows } = await pool.query(
    "SELECT userid,firstname,lastname,email FROM Users WHERE isadmin = false ORDER BY lastname,firstname "
  );
  return rows;
}

module.exports = {
  postNewUser,
  getUserByEmail,
  updateUser,
  resetPassword,
  deleteUser,
  getUsers,
};
