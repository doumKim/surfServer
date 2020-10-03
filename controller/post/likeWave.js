const { User } = require("../../models");
module.exports = {
  get: async (req, res) => {
    try {
      const userId = req.session.passport.user;
      const user = await User.findOne({
        where: { id: userId },
      });
      const likeWaveList = await user.getLikedWaves();
      res.status(200).json(likeWaveList);
    } catch (err) {
      console.error(err);
    }
  },
};
