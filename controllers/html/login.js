const isLoggedIn = require("../../utils/auth");
const menu = require("../../public/assets/mainMenu.json");
const router = require("express").Router();

// displays the login form page...
router.get("/", async (req, res) => {
  try {
    // checks if user is already logged in....
    if (!req.session.user_name) {
      res.render("login", {
        menu,
        session: req.session,
      });
    } else {
      // if user is logged in, reroutes to the home page...
      res.render("posts", {
        menu,
        session: req.session,
      });
    }
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
