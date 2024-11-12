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
async function updateUser(req, res) {
  const { email, newemail, newhashedpassword } = req.body;
  if (!newemail || !newhashedpassword) {
    return res.status(400).json({ error: "Hiányzó adatok a kliens felől" });
  }
  try {
    const newHashedpassword = await bcrypt.hash(newhashedpassword, 10);
    const { success } = await db.updateUser(email, newemail, newHashedpassword);
    if (!success) {
      return res.status(404).json({ error: "Nem található a felhasználó!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a felhasználó frissítésekor!" });
  }
}

module.exports = { postNewUser, postLogin, updateUser };
