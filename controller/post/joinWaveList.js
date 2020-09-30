const { PhasePost, Post } = require("../../models");
module.exports = {
  //파도이어가기목록(내가 참여한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const sort = req.query.sort;

      if (count) {
        //메인페이지에서 3개정도 받아옴
        let result = [];
        let list = await PhasePost.findAll({
          offset: 0,
          limit: count,
          order: "created_at desc",
          where: {
            user_id: req.session.passport.user,
          },
        });

        await list.forEach(element => {
          let post = Post.findOne({
            where: {
              id: element.post_id,
            },
          });
          result.push(post);
        });
        res.status(200).json(result);
      } else {
        // 전체 내가참여한글목록 받아옴
        let result = [];
        let list = await PhasePost.findAll({
          order: `${sort} desc`,
          where: {
            user_id: req.session.passport.user,
          },
        });

        await list.forEach(element => {
          let post = Post.findOne({
            where: {
              id: element.post_id,
            },
          });
          result.push(post);
        });
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(401).send("Bad Request");
    }
  },
};
