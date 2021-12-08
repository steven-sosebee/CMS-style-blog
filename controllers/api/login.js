const { User } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    // console.log(userData);
    if (!userData) {
      res.status(400).json({
        message: "User name is not found...",
      });
      return;
    }
    const passwordCheck = await userData.checkPassword(req.body.password);
    // console.log(passwordCheck);
    if (!passwordCheck) {
      res.status(400).json({ message: "Incorrect username or password..." });
      return;
    }

    await req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      res.status(200).json({ message: "Success..." });
    });

    // return;
    // console.log(req.session);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
