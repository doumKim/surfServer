const { User, Post } = require("../../models");
module.exports = {
  get: async (req, res) => {
    try {
      const userId = req.session.passport.user;
      const likedWaves = await User.findOne({
        where: { id: userId },
        attributes: [],
        include: [
          {
            model: Post,
            as: "LikedWaves",
            include: {
              model: User,
              as: "creator_info",
              attributes: ["avartar_url", "username"],
            },
          },
        ],
      });
      // const likeWaveList = await user.getLikedWaves();
      res.status(200).json(likedWaves);
    } catch (err) {
      console.error(err);
    }
  },
};
