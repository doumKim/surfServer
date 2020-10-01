module.exports = sequelize => {
  const User_post = sequelize.define("user_post", {}, { underscored: true });

  User_post.associate = models => {
    User_post.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    User_post.belongsTo(models.Post, {
      foreignKey: "post_id",
    });
  };

  return User_post;
};
