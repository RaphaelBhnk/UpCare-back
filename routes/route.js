const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

//router.use(checkAuth);
// router.post("/psy", controller.getPsy);
router.post("/psy", (req, res) => {
  res.json({ test: "result" });
});
router.post("/form", controller.sub);
router.get("/version", (req, res) => {
  res.json({ version: "1.0.2" }); // Update this with each deployment
});
module.exports = router;
