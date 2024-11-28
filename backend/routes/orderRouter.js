const { Router } = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = Router();

orderRouter.post("/postorder", orderController.postOrder);

module.exports = orderRouter;