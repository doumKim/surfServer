module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avartar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = models => {
    User.belongsToMany(models.Post, {
      through: "user_post",
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };

  return User;
};
