const { user_post, Post } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const likePost = await user_post.findAll({
        order: [["created_at", "DESC"]],
        where: {
          user_id: req.session.passport.user,
        },
      });

      const likeWaveList = likePost.filter(async post => {
        const posts = await Post.findOne({
          where: {
            id: post.dataValues.post_id,
          },
        });
        return posts;
      });

      res.status(200).json(likeWaveList);
    } catch (err) {
      console.error(err);
      res.status(401).send("Bad Request");
    }
  },
};
