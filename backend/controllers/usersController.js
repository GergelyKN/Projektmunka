const db = require("../model/usersQueries/usersQuery");

async function postNewUser(req, res) {
  const { regFirstName, regLastName, regEmail, regPassword } = req.body;
  if (!regFirstName || !regLastName || !regEmail || !regPassword) {
    return res.status(400).json({ error: "Hiányzó mezők" });
  }

  try {
    await db.postNewUser({ regFirstName, regLastName, regEmail, regPassword });
    return res.status(201).json({ message: "Felhasználó rögzítve" });
  } catch (error) {
    console.error("Sikertelen rögzítés: ", error);
    return res
      .status(500)
      .json({ error: "Hiba történt a felhasználó rögzítésekor" });
  }
}

module.exports = { postNewUser };
