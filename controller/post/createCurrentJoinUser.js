const { Post } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      await Post.update(
        {
          current_join_user: req.session.passport.user,
        },
        {
          where: {
            id: req.query.id,
          },
        }
      );
      res.status(200).send("success submit current_join_user");
    } catch (err) {
      res.status(500).send("already exist current_join_user");
    }
  },
};
