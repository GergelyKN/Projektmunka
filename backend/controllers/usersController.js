const db = require("../model/usersQueries/usersQuery");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmailChangedPassword(password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: TOEMAIL,
    subject: `Új jelszó`,
    text: `
Az ideiglenes jelszavad, kérjük minél hamarabb változtasd meg!
${password}

Üdvözlettel,
TableTop Bár Vezetőség`,
    replyTo: process.env.EMAIL,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sikeresen elküldve!");
  } catch (err) {
    console.error("Email küldési hiba: ", err);
  }
}
async function sendEmailCreatedUser(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: TOEMAIL,
    subject: "Sikeres regisztráció",
    text: `
Köszönjük a regisztrációt!
${email}

Várunk sok szeretettel,
TableTop Bár Vezetőség`,
    replyTo: process.env.EMAIL,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sikeresen elküldve!");
  } catch (err) {
    console.error("Email küldési hiba: ", err);
  }
}

async function postNewUser(req, res) {
  const { regFirstName, regLastName, regEmail, regPassword } = req.body;
  if (!regFirstName || !regLastName || !regEmail || !regPassword) {
    return res.status(400).json({ error: "Hiányzó mezők" });
  }

  try {
    const hashedPassword = await bcrypt.hash(regPassword, 10);

    await sendEmailCreatedUser(regEmail);
    await db.postNewUser({
      regFirstName,
      regLastName,
      regEmail,
      hashedPassword,
    });

    return res.status(201).json({ message: "Sikeres regisztráció!" });
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
    return res.status(400).json({ error: "Hiányzó adatok a kliens felől!" });
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

async function resetPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Hiányzó adatok a kliens felől!" });
  }
  try {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    const generatedPassword = await bcrypt.hash(password, 10);
    const { success } = await db.resetPassword(email, generatedPassword);
    if (!success) {
      return res.status(404).json({ error: "Nem található az email cím!" });
    } else {
      await sendEmailChangedPassword(password);
      return res.status(200).json({ message: "Sikeres frissítés!", password });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a jelszó frissítése közben!" });
  }
}

async function deleteUser(req, res) {
  const { userID } = req.body;
  if (!userID) {
    return res.status(400).json({ error: "Hiányzó adatok a kliens felől!" });
  }
  try {
    const { success } = await db.deleteUser(userID);
    if (!success) {
      return res.status(404).json({ error: "Nem található a felhasználó!" });
    }
    return res.status(200).json({ message: "Sikeres törlés!" });
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a felhasználó törlésekor!" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a felhasználók lekérdezésekor!" });
  }
}

module.exports = {
  postNewUser,
  postLogin,
  updateUser,
  resetPassword,
  deleteUser,
  getUsers,
};
