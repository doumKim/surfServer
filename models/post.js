module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      max_Phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: "create_user",
      allowNull: false,
      onDelete: "cascade",
    });
    Post.belongsTo(models.User, {
      foreignKey: "current_join_user",
      allowNull: true,
      onDelete: "cascade",
    });
    Post.belongsToMany(models.User, {
      through: "user_post",
      foreignKey: "post_id",
      onDelete: "cascade",
    });
  };

  return Post;
};
