const { Post, sequelize } = require("../../models");
module.exports = {
  get: async (req, res) => {
    try {
      let post = await Post.findOne({
        where: {
          id: req.params.id,
        },
      });
      await Post.update(
        {
          visits: sequelize.literal("visits + 1"),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(post);
    } catch (err) {
      res.status(400).send("Invalid Access to post data");
    }
  },
};
