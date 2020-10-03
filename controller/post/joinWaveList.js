const { PhasePost, Post, User } = require("../../models");
module.exports = {
  //파도이어가기목록(내가 참여한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const userId = req.session.passport.user;
      const joinWaveList = await PhasePost.findAll({
        offset: 0,
        limit: Number(count) || 100,
        order: [["created_at", "DESC"]],
        where: {
          user_id: req.session.passport.user,
        },
        attributes: ["created_at"],
        include: [
          {
            model: Post,
            as: "wave",
            include: [
              {
                model: User,
                as: "creator_info",
                attributes: ["avartar_url", "username"],
              },
              {
                model: User,
                as: "Likers",
                attributes: ["id"],
                where: { id: userId },
              },
            ],
          },
        ],
      });

      for (let i = 0; i < joinWaveList.length; i++) {
        if (joinWaveList[i].wave.dataValues.Likers[0]) {
          joinWaveList[i].wave.dataValues.liked = true;
        }
      }

      res.status(200).json(joinWaveList);
    } catch (err) {
      console.error(err);
      res.status(401).send("Bad Request");
    }
  },
};
