module.exports = (sequelize, DataTypes) => {
  const user_post = sequelize.define("user_post", {});

  user_post.associate = models => {
    user_post.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    user_post.belongsTo(models.Post, {
      foreignKey: "post_id",
    });
  };

  return user_post;
};
