const { Router } = require("express");
const openInformationController = require("../controllers/openInformationController");
const openInformationRouter = Router();

openInformationRouter.get(
  "/getopeninfos",
  openInformationController.getAllOpenInfos
);
openInformationRouter.get(
  "/getopeninfobyday",
  openInformationController.getOpenInfoByDay
);

module.exports = openInformationRouter;
