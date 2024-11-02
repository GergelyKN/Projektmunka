const { Router } = require("express");

const boardGamesRouter = Router();
const boardGamesController = require("../controllers/boardGamesController");

boardGamesRouter.get("/", boardGamesController.getBoardGames);

module.exports = boardGamesRouter;
