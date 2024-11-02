const { Router } = require("express");
const drinksController = require("../controllers/drinksController");
const drinksRouter = Router();

drinksRouter.get("/", drinksController.drinksGet);

module.exports = drinksRouter;
