const router = require("express").Router();
const loginApiRoutes = require("./login");
const postApiRoutes = require("./posts");
const commentApiRoutes = require("./comments");

// routes used for accessing the comments table in the database
router.use("/comments", commentApiRoutes);

// routes used for accessing the user table in the database
router.use("/login", loginApiRoutes);

// routes used for accessing the posts table in the database
router.use("/posts", postApiRoutes);

module.exports = router;
