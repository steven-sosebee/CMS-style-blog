const { Post } = require("../../models");
const isLoggedIn = require("../../utils/auth");
const router = require("express").Router();

router.post("/add", isLoggedIn, async (req, res) => {
  try {
    console.log(req.body);
    const postData = await Post.create({
      post_name: req.body.post_name,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
      // "req.session.user_id",
    });
    res.status(200).json(postData);
    // res.redirect("/posts");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/delete", isLoggedIn, async (req, res) => {
  try {
    console.log("Deleting post...");
    const postData = await Post.destroy({ where: { id: req.body.post_id } });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
