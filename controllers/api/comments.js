const { Post, Comment } = require("../../models");
const isLoggedIn = require("../../utils/auth");
const router = require("express").Router();

// adds a users comment to the post in the database
router.post("/add", isLoggedIn, async (req, res) => {
  try {
    // uses the user inputs to create a comment record in the database...
    const commentData = await Comment.create({
      post_id: req.body.post_id,
      comment: req.body.comment,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    // if an error occurs while updating the comment, returns a server side error...
    console.log(err);
    res.status(500).json(err);
  }
});

// deletes the selected comment on the database...
router.post("/delete", isLoggedIn, async (req, res) => {
  try {
    // sends the comment data to the database for deletion...
    const commentData = await Comment.destroy({
      where: { id: req.body.comment_id },
    });
    res.status(200).json(commentData);
  } catch (err) {
    // if an error occurs while updating the comment, returns a server side error...
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
