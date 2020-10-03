const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.PhasePost = require("./phase_post")(sequelize, Sequelize);
db.User.hasMany(db.PhasePost, { foreignKey: "user_id", sourceKey: "id" });
db.PhasePost.belongsTo(db.PhasePost, {
  foreignKey: "user_id",
  targetKey: "id",
});
db.Post.hasMany(db.PhasePost, {
  foreignKey: "post_id",
  sourceKey: "id",
  as: "phase_waves",
});
db.PhasePost.belongsTo(db.Post, {
  foreignKey: "post_id",
  targetKey: "id",
  as: "wave",
});
db.User.hasMany(db.Post, {
  foreignKey: "create_user",
  sourceKey: "id",
  as: "write_wave_list",
});
db.Post.belongsTo(db.User, {
  foreignKey: "create_user",
  targetKey: "id",
  as: "creator_info",
});
db.User.hasMany(db.Post, {
  foreignKey: "current_join_user",
  sourceKey: "id",
  as: "join_write_wave_list",
});
db.Post.belongsTo(db.User, {
  foreignKey: "current_join_user",
  targetKey: "id",
  as: "join_creator_info",
});
db.User.belongsToMany(db.Post, {
  through: "like_posts",
  timestamps: false,
  as: "LikedWaves",
});
db.Post.belongsToMany(db.User, {
  through: "like_posts",
  timestamps: false,
  as: "Likers",
});
module.exports = db;
