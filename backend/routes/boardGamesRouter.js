const { Router } = require("express");

const boardGamesRouter = Router();
const boardGamesController = require("../controllers/boardGamesController");

boardGamesRouter.get("/", boardGamesController.getBoardGames);
boardGamesRouter.get(
  "/categories",
  boardGamesController.getBoardGameCategories
);
boardGamesRouter.get("/languages", boardGamesController.getBoardGameLanguages);

module.exports = boardGamesRouter;
