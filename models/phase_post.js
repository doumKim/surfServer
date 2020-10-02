module.exports = (sequelize, DataTypes) => {
  const PhasePost = sequelize.define(
    "PhasePost",
    {
      text: {
        type: DataTypes.STRING(6000),
        allowNull: false,
      },
      sub_title: {
        type: DataTypes.STRING,
        allowNull: false,
        defalteValue: "",
      },
      current_phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  PhasePost.associate = models => {
    PhasePost.belongsTo(models.User, {
      foreignKey: "user_id",
      allowNull: false,
      onDelete: "cascade",
    });
    PhasePost.belongsTo(models.Post, {
      foreignKey: "post_id",
      allowNull: false,
      onDelete: "cascade",
    });
  };

  return PhasePost;
};
