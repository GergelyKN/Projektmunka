const { Router } = require("express");
const adminController = require("../controllers/adminController.js");

const adminRouter = Router();

//#region Ellenőrtés Input mezőket ellenőrízni a kontrollerben a megfelelő adattípus érdekében

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

module.exports = adminRouter;
