const { Post, sequelize, PhasePost } = require("../../models");
const { mapToPostLikeValue } = require("./helper");
module.exports = {
  get: async (req, res) => {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          model: PhasePost,
          as: "phase_waves",
        },
      });
      // console.log(post)

      if (req.session.passport) {
        const authUser = req.session.passport.user;
        await mapToPostLikeValue(post, authUser);
      }

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
      console.error(err);
      res.status(400).send("Invalid Access to post data");
    }
  },
};
