const db = require("../model/usersQueries/usersQuery");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function postNewUser(req, res) {
  const { regFirstName, regLastName, regEmail, regPassword } = req.body;
  if (!regFirstName || !regLastName || !regEmail || !regPassword) {
    return res.status(400).json({ error: "Hiányzó mezők" });
  }

  try {
    const hashedPassword = await bcrypt.hash(regPassword, 10);

    await db.postNewUser({
      regFirstName,
      regLastName,
      regEmail,
      hashedPassword,
    });
    return res.status(201).json({ message: "Felhasználó rögzítve" });
  } catch (error) {
    console.error("Sikertelen rögzítés: ", error);
    return res
      .status(500)
      .json({ error: "Hiba történt a felhasználó rögzítésekor" });
  }
}

async function postLogin(req, res) {
  const { loginEmail, loginPassword } = req.body;
  if (!loginEmail || !loginPassword) {
    return res.status(400).json({ error: "Hiányzó mezők" });
  }
  try {
    const user = await db.getUserByEmail(loginEmail);

    if (user.length === 0) {
      return res.status(401).json({ error: "Felhasználó nem található" });
    }

    const isValidPassword = await bcrypt.compare(
      loginPassword,
      user[0].hashedpassword
    );
    if (!isValidPassword) {
      return res.status(404).json({ error: "Helytelen email vagy jelszó" });
    }

    const token = jwt.sign(
      {
        userID: user[0].userid,
        isAdmin: user[0].isAdmin,
      },
      process.env.TOKENKEY,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(201)
      .json({ token, user, message: "Sikeres bejelentkezés" });
  } catch (error) {
    console.error("Sikertelen bejelentkezés: ", error);
    return res.status(500).json({ error: "Hiba történt a bejelentkezéskor" });
  }
}

module.exports = { postNewUser, postLogin };
