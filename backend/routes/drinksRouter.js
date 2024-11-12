const { Router } = require("express");
const drinksController = require("../controllers/drinksController");
const drinksRouter = Router();

drinksRouter.get("/", drinksController.drinksGet);
drinksRouter.get("/categories", drinksController.getDrinkCategories);

module.exports = drinksRouter;
