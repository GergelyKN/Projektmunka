const db = require("../model/boardGamesQueries/boardGamesQuery");

async function getBoardGames(req, res) {
  try {
    const boardgames = await db.getAllBoardGames();
    res.status(200).json(boardgames);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getBoardGameCategories(req, res) {
  try {
    const categories = await db.getAllBoardGameCategory();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Hiba történt a kategóriák lekérdezése közben");
    return res
      .status(500)
      .json({ error: "Hiba történt a kategóriák lekérdezése közben" });
  }
}
async function getBoardGameLanguages(req, res) {
  try {
    const languages = await db.getAllBoardGameLanguage();
    res.status(200).json(languages);
  } catch (error) {
    console.error("Hiba történt a nyelvek lekérdezése közben");
    return res
      .status(500)
      .json({ error: "Hiba történt a nyelvek lekérdezése közben" });
  }
}

module.exports = {
  getBoardGames,
  getBoardGameCategories,
  getBoardGameLanguages,
};
