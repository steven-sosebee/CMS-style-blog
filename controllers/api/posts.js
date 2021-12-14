const { Post } = require("../../models");
const isLoggedIn = require("../../utils/auth");
const router = require("express").Router();

// adds a post using the user input data to the database...
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    const postData = await Post.create({
      post_name: req.body.post_name,
      post_text: req.body.post_text,
      // uses the logged-in user ID to populate the user field...
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    // if an error occurs, returns a server-side error to the client...
    console.log(err);
    res.status(500).json(err);
  }
});

// deletes the selected post from the database...
router.post("/delete", isLoggedIn, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.body.post_id);
    if (req.session.user_id === postData.user_id) {
      await Post.destroy({ where: { id: req.body.post_id } });
      res.status(200).json(postData);
    } else {
      res.status(400).json({
        message: "This post is not yours.  Please sign-in as poster to delete.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
