const { Post } = require("../../models");
module.exports = {
  post: async (req, res) => {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (post.current_join_user !== null) {
        throw new Error();
      }
      await Post.update(
        {
          current_join_user: req.session.passport.user,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("success submit current_join_user");
    } catch (err) {
      res.status(500).send("already exist current_join_user");
    }
  },
};
