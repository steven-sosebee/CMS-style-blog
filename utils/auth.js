const isLoggedIn = (req, res, next) => {
  console.log("Is user logged in...");
  console.log(req.session);
  console.log(!req.session.logged_in);
  if (!req.session.logged_in) {
    console.log("redirect to login...");
    res.redirect("/login");
    res.status(401);
    return;
  } else {
    next();
  }
};

module.exports = isLoggedIn;
