const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");

const userSeedData = require("./userSeedData.json");
const postSeedData = require("./postSeedData.json");
const commentSeedData = require("./commentSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  // creates posts and comments from seed data...
  const posts = await Post.bulkCreate(postSeedData);
  const comments = await Comment.bulkCreate(commentSeedData);
  process.exit(0);
};
// seed database
seedDatabase();
