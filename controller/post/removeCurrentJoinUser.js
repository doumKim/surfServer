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
        if (post.current_join_user === req.session.passport.user) {
          await Post.update(
            {
              current_join_user: null,
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
        }
      }
      res.status(200).send("successfuly remove current_join_user");
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
