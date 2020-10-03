module.exports = (sequelize, DataTypes) => {
  const PhasePost = sequelize.define(
    "PhasePost",
    {
      text: {
        type: DataTypes.STRING(3000),
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

  return PhasePost;
};
