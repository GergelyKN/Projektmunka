const { Router } = require("express");
const reservationController = require("../controllers/reservationController");
const reservationRouter = Router();

reservationRouter.get("/getrooms", reservationController.getAllRoom);
reservationRouter.post(
  "/postreservation",
  reservationController.postReservation
);
reservationRouter.get(
  "/getreservationsbydate",
  reservationController.getReservationsByDate
);

reservationRouter.get(
  "/getmyreservations",
  reservationController.getReservationsByUserID
);

module.exports = reservationRouter;
