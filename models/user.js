module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sns_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avartar_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { underscored: true }
  );

  User.associate = models => {
    User.belongsToMany(models.Post, {
      through: "like_posts",
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };

  return User;
};
