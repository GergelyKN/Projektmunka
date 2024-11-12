const pool = require("../pool");
async function getAllBoardGames() {
  const { rows } = await pool.query(
    "SELECT boardgames.*, boardgamecategory.categoryname, boardgamelanguage.language FROM boardgames JOIN boardgamecategory ON boardgames.categoryID = boardgamecategory.categoryID JOIN boardgamelanguage ON boardgames.languageID = boardgamelanguage.languageID;"
  );
  return rows;
}
async function getAllBoardGameCategory() {
  const { rows } = await pool.query("SELECT * FROM boardgamecategory");
  return rows;
}
async function getAllBoardGameLanguage() {
  const { rows } = await pool.query("SELECT * FROM boardgamelanguage");
  return rows;
}

module.exports = {
  getAllBoardGames,
  getAllBoardGameCategory,
  getAllBoardGameLanguage,
};
