const sequelize = require("sequelize");
const Op = sequelize.Op;
const { PhasePost, Post, User } = require("../../models");
module.exports = {
  //파도이어가기목록(내가 참여한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const userId = req.session.passport.user;

      const userName = await User.findOne({
        where: {
          id: userId,
        },
      });

      console.log(userName.dataValues.username);

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
            where: {
              create_user: {
                [Op.notLike]: userId,
              },
            },
            include: [
              {
                model: User,
                as: "creator_info",
                attributes: ["avartar_url", "username"],
              },
            ],
          },
        ],
      });

      res.status(200).json(joinWaveList);
    } catch (err) {
      console.error(err);
      res.status(401).send("Bad Request");
    }
  },
};
