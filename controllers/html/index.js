const router = require("express").Router();
const logoutRoutes = require("./logout");
const loginRoutes = require("./login");
const dashboardRoutes = require("./dashboard");
const menu = require("../../public/assets/mainMenu.json");

// calls the logout scripts...
router.use("/logout", logoutRoutes);

// routes to display the post information...
router.use("/dashboard", dashboardRoutes);

// displays the login or signup form...
router.use("/login", loginRoutes);

// home page route...
router.get("/", async (req, res) => {
  try {
    res.render("home", {
      menu,
      session: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
