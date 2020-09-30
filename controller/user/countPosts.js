const { Post, user_post, PhasePost } = require("../post");

module.exports = {
  get: async (req, res) => {
    try {
      //유저의 좋아요글목록수, 파도이어가기 수, 파도 일으키기 수
      const sort = req.qeury.sort;
      let result = [];
      let result2 = [];

      let resultCreate = await Post.findAndCountAll({
        where: {
          create_user: req.session.passport.user,
        },
      });
      let resultPhase = await PhasePost.findAll({
        where: {
          user_id: req.session.passport.user,
        },
      });

      await resultPhase.forEach(element => {
        let post = Post.findOne({
          where: {
            id: element.post_id,
          },
        });
        result.push(post);
      });

      let resultLike = await user_post.findAll({
        order: `${sort} desc`,
        where: {
          user_id: req.session.passport.user,
        },
      });

      await resultLike.forEach(element => {
        let post = Post.findOne({
          where: {
            id: element.post_id,
          },
        });

        result2.push(post);
      });

      const countCreateWave = resultCreate.count;
      const countJoinWave = result.length;
      const countLikeWave = result2.length;

      let obj = {
        countCreateWave: countCreateWave,
        countJoinWave: countJoinWave,
        countLikeWave: countLikeWave,
      };

      res.status(200).json(obj);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
