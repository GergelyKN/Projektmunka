const { Router } = require("express");
const adminController = require("../controllers/adminController.js");

const adminRouter = Router();

//Italok
adminRouter.delete("/drinks", adminController.deleteDrink);
adminRouter.put("/drinks", adminController.updateDrink);
adminRouter.post("/drinks", adminController.addDrink);
adminRouter.post("/drinks/addcategory", adminController.addDrinkCategory);
adminRouter.delete(
  "/drinks/removecategory",
  adminController.removeDrinkCategory
);
adminRouter.put("/drinks/updatecategory", adminController.updateDrinkCategory);

//Társasjátékok
adminRouter.post(
  "/boardgames/addcategory",
  adminController.addBoardGameCategory
);
adminRouter.delete(
  "/boardgames/removecategory",
  adminController.removeBoardGameCategory
);
adminRouter.put(
  "/boardgames/updatecategory",
  adminController.updateBoardGameCategory
);
adminRouter.delete("/boardgames", adminController.deleteBoardGame);
adminRouter.put("/boardgames", adminController.updateBoardGame);
adminRouter.post("/boardgames", adminController.addBoardGame);

//Foglalások
adminRouter.get("/reservations", adminController.getAllReservations);
adminRouter.delete(
  "/reservations/removereservation",
  adminController.deleteReservation
);

//Zárt napok
adminRouter.post("/closeddates/addcloseddate", adminController.addClosedDate);
adminRouter.delete(
  "/closeddates/deletecloseddate",
  adminController.deleteClosedDate
);

module.exports = adminRouter;
