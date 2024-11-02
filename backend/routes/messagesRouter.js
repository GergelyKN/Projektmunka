const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.post("/", messagesController.postNewMessage);

module.exports = messagesRouter;
