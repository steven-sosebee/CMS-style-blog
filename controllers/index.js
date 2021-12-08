const router = require("express").Router();
const htmlRoutes = require("./html");
const menu = require("../public/assets/mainMenu.json");

const apiRoutes = require("./api/");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

// TODO: develop 404 page
router.get("*", async (req, res) => {
  try {
    res.render("404", {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
