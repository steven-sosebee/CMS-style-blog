const router = require("express").Router();
const { Post, User } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");

router.get("/", async (req, res) => {
  try {
    // const postData = await Post.findAll();
    console.log("Rendering posts... post route");
    const postData = await Post.findAll({ include: [{ model: User }] });
    // console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts);
    res.render("posts", {
      session: req.session,
      menu,
      posts,
    });
  } catch (err) {
    // console.log(err);
    res.status(500);
  }
});

module.exports = router;
