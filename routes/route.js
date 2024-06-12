const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

//router.use(checkAuth);
router.post("/psy", controller.getPsy);
router.post("/form", controller.sub);

module.exports = router;
