const router = require("express").Router();
const logoutRoutes = require("./logout");
const loginRoutes = require("./login");
const postRoutes = require("./posts");
const menu = require("../../public/assets/mainMenu.json");

router.use("/logout", logoutRoutes);
router.use("/posts", postRoutes);
router.use("/login", loginRoutes);

router.get("/", async (req, res) => {
  try {
    const currentSession = req.session;
    console.log(currentSession);
    res.render("posts", {
      menu,
      session: currentSession,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;