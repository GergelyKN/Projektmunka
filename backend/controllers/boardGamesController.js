const db = require("../model/boardGamesQueries/boardGamesQuery");

async function getBoardGames(req, res) {
  try {
    const boardgames = await db.getAllBoardGames();
    res.json(boardgames);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send("Internal Server Error");
  }
}
module.exports = { getBoardGames };
