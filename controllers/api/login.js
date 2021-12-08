const { User } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    if (!userData) {
      res.status(400).json({
        message: "User name is not found...",
      });
      return;
    }
    const passwordCheck = await userData.checkPassword(req.body.password);
    if (!passwordCheck) {
      res.status(400).json({ message: "Incorrect username or password..." });
      return;
    }
    console.log("Before...");
    console.log(req.session);
    req.session.user_id = userData.id;
    req.session.user_name = userData.user_name;
    req.session.logged_in = true;
    // req.session.save(() => {
    res.send("Login successful...");
    // res.status(200).json({ message: "Login successful..." });
    // });
    console.log("After...");
    console.log(req.session);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
