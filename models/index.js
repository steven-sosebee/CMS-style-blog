const Comment = require("./comments");
const Post = require("./posts");
const User = require("./users");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
  foreignKey: "user_id",
});
module.exports = { Comment, Post, User };
