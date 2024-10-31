const pool = require("../pool");
async function getAllBoardGames() {
  const { rows } = await pool.query(
    "SELECT boardgames.*, boardgamecategory.categoryname, boardgamelanguage.language FROM boardgames JOIN boardgamecategory ON boardgames.categoryID = boardgamecategory.categoryID JOIN boardgamelanguage ON boardgames.languageID = boardgamelanguage.languageID;"
  );
  return rows;
}

module.exports = { getAllBoardGames };
