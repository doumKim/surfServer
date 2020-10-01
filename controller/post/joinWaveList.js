const { PhasePost, Post } = require("../../models");
module.exports = {
  //파도이어가기목록(내가 참여한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const sort = req.query.sort;
      //메인페이지에서 3개정도 받아옴
      const list = await PhasePost.findAll({
        offset: 0,
        limit: Number(count) || 100,
        order: [[sort, "ASC"]],
        where: {
          user_id: req.session.passport.user,
        },
      });

      const joinWaveList = list.filter(async joinWave => {
        const posts = await Post.findOne({
          where: {
            id: joinWave.dataValues.post_id,
          },
        });
        return posts;
      });
      res.status(200).json(joinWaveList);
    } catch (err) {
      console.error(err);
      res.status(401).send("Bad Request");
    }
  },
};
