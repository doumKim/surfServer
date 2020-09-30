const { user_post, Post } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const sort = req.query.sort;
      let result = [];

      let likeList = await user_post.findAll({
        order: [[sort, "DESC"]],
        where: {
          user_id: req.session.passport.user,
        },
      });

      await likeList.forEach(element => {
        let post = Post.findOne({
          where: {
            id: element.post_id,
          },
        });

        result.push(post);
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(401).send("Bad Request");
    }
  },
};
