const { LikePost, Post } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const likePosts = await LikePost.findAll({
        order: [["created_at", "DESC"]],
        where: {
          user_id: req.session.passport.user,
        },
      });

      const likeWaveList = await Promise.all(
        likePost.map(async post => {
          const posts = await Post.findOne({
            where: {
              id: post.dataValues.post_id,
            },
          });

          return posts.dataValues;
        })
      );
      res.status(200).json(likeWaveList);
    } catch (err) {
      res.status(401).send("Bad Request");
    }
  },
};
