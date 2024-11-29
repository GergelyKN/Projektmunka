const { Router } = require("express");

const drinkStorageRouter = Router();
const drinkStorageController = require("../controllers/drinkStorageController");

drinkStorageRouter.put("/", drinkStorageController.updateDrink);

module.exports = drinkStorageRouter;
