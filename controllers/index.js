const router = require("express").Router();
const htmlRoutes = require("./html");
const menu = require("../public/assets/mainMenu.json");

const apiRoutes = require("./api/");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

// error page for wayward url requests...
router.get("*", async (req, res) => {
  try {
    res.render("home", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
