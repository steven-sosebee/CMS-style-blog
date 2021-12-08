const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");

router.get("/", async (req, res) => {
  try {
    console.log("Rendering posts...");
    console.log(req.session.user_name);
    const postData = await Post.findAll({ include: [{ model: User }] });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("posts", {
      session: req.session,
      menu,
      posts,
    });
  } catch (err) {
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("Rendering comments...");
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    // const postData = await Post.findByPk(req.params.id);

    // console.log(postData);
    const posts = postData.get({ plain: true });
    console.log(posts);
    res.render("comments", {
      session: req.session,
      menu,
      posts,
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
