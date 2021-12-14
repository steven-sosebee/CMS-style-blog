const router = require("express").Router();
const menu = require("../../public/assets/mainMenu.json");

// ends the current session and logs the user out of the application...
router.get("/", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.render("home", {
        menu,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
