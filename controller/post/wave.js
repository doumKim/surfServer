const { Post, User, PhasePost } = require("../../models");
const { mapToPostLikeValue } = require("../helper");
module.exports = {
  get: async (req, res) => {
    try {
      const post = await Post.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: PhasePost,
            as: "phase_waves",
          },
          {
            model: User,
            as: "creator_info",
            attributes: ["username"],
          },
        ],
      });

      if (req.session.passport) {
        const authUser = req.session.passport.user;
        await mapToPostLikeValue(post, authUser);
      }

      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      res.status(400).send("Invalid Access to post data");
    }
  },
};
