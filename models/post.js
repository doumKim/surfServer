module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      title_image: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return Post;
};
