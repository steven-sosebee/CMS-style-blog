const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const menu = require("../../public/assets/mainMenu.json");

// returns all posts and renders the posts layout...
router.get("/", async (req, res) => {
  try {
    // returns all post data with user information...
    const postData = await Post.findAll({ include: [{ model: User }] });
    const posts = postData.map((post) => post.get({ plain: true }));
    // renders the posts layout with the session and post details...
    res.render("posts", {
      session: req.session,
      menu,
      posts,
    });
  } catch (err) {
    res.status(500);
  }
});

// drills into a specific post to view all comments...
router.get("/:id", async (req, res) => {
  try {
    // returns the selected post with information about the comments and user IDs for each comment...
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
    const posts = postData.get({ plain: true });
    console.log(posts);
    // renders the comments layout for the selected post...
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
