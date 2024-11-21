const { Router } = require("express");
const closedDateController = require("../controllers/closedDateController");

const closedDateRouter = Router();

closedDateRouter.get("/", closedDateController.getAllClosedDates);

module.exports = closedDateRouter;
