const router = require("express").Router();
const menu = require("../../public/assets/mainMenu.json");

router.get("/", async (req, res) => {
  try {
    req.session.destroy(() => {
      //   res.status(204);
      res.render("home", {
        session: req.session,
        menu,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
