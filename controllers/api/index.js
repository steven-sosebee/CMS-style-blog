const router = require("express").Router();
const loginApiRoutes = require("./login");
const postApiRoutes = require("./posts");
router.use("/login", loginApiRoutes);
router.use("/posts", postApiRoutes);
module.exports = router;
