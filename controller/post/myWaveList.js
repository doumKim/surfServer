const { Post } = require("../../models");

module.exports = {
  //내가 일으킨 파도 목록(내가 작성한 글 목록)
  get: async (req, res) => {
    try {
      const count = req.query.count;
      const sort = req.query.sort;

      if (count) {
        let result = await Post.findAll({
          offset: 0,
          limit: count,
          order: "created_at desc",
          where: {
            create_user: req.session.passport.user,
          },
        });

        res.status(200).json(result);
      } else {
        let result = await Post.findAll({
          offset: 0,
          order: `${sort} desc`,
          where: {
            create_user: req.session.passport.user,
          },
        });

        res.status(200).json(result);
      }
    } catch (err) {
      res.status(401).send("Invalid Access");
    }
  },
};
