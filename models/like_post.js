module.exports = sequelize => {
  const LikePost = sequelize.define("like_posts", {}, { underscored: true });

  LikePost.associate = models => {
    LikePost.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    LikePost.belongsTo(models.Post, {
      foreignKey: "post_id",
    });
  };

  return LikePost;
};
