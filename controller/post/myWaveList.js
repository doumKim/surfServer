const { Post } = require("../../models");
const { mapToPostsLikeValue } = require("../helper");
module.exports = {
  //내가 일으킨 파도 목록(내가 작성한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const sort = req.query.sort; // create_at, like (recent,hot)
      const passport = req.query.passport;
      const myWaveList = await Post.findAll({
        offset: 0,
        limit: Number(count) || 100,
        order: [[sort, "DESC"]],
        where: {
          create_user: req.session.passport.user,
        },
      });

      await mapToPostsLikeValue(myWaveList, passport);
      res.status(200).json(myWaveList);
    } catch (err) {
      res.status(401).send("Invalid Access");
    }
  },
};
