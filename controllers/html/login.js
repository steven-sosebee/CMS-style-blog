const isLoggedIn = require("../../utils/auth");
const menu = require("../../public/assets/mainMenu.json");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    console.log("rendering login screen...");
    req.session.save(() => {
      //   req.session.logged_in = true;
      //   req.session.user_name = "steven";
      res.render("login", {
        menu,
        session: req.session,
      });
    });
    return;
  } catch (err) {
    console.log("Error in rendering login screen...");
    res.status(500).json(err);
  }
});

module.exports = router;
