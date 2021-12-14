const { User } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");
const router = require("express").Router();

// Login route for existing users...

router.post("/", async (req, res) => {
  try {
    // uses information from login form to lookup user data in database...
    const userData = await User.findOne({
      where: { user_name: req.body.user_name },
    });

    //checks if user data is found...
    if (!userData) {
      res.status(400).json({
        message: "User name is not found...",
      });
      return;
    }

    // if user record is found, confirms that the password matches...
    const passwordCheck = await userData.checkPassword(req.body.password);
    if (!passwordCheck) {
      res.status(400).json({ message: "Incorrect username or password..." });
      return;
    }

    // if user data is correct, saves user information to session and returns to client...
    req.session.user_id = userData.id;
    req.session.user_name = userData.user_name;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json(req.session);
    });
  } catch (err) {
    // if server is not found or there is an error with the request, returns an
    res.status(500).json(err);
  }
});

// adds new users to the database...
router.post("/signup", async (req, res) => {
  try {
    // creates a new user record using information from the sign-up form...
    const newUser = User.create({
      user_name: req.body.user_name,
      email: req.body.user_email,
      password: req.body.password,
    });
    req.session.user_name = newUser.user_name;
    req.session.user_id = newUser.user_id;
    req.session.logged_in = true;
    // saves the user information to the session, if successfully created...
    req.session.save(() => {
      res.status(200).json({ message: "user successfully created..." });
    });
  } catch (err) {
    // if server is not found or there is an error with the request, returns an
    res.status(500).json(err);
  }
});

module.exports = router;
