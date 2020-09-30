const { user_post, sequelize, User, Post } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const sess = req.session;
    const postId = req.params.id;
    try {
      let post = await Post.findOne({
        where: {
          id: postId,
        },
      });

      let user = await User.findOne({
        where: {
          id: req.session.passport.user,
        },
      });

      //post의 like 1증가
      await Post.update(
        {
          like: sequelize.literal("like + 1"),
        },
        {
          where: {
            id: postId,
          },
        }
      );

      //post를 쓴 user의 exp 1증가
      await User.update(
        {
          exp: sequelize.literal("exp + 1"),
        },
        {
          where: {
            id: post.create_user,
          },
        }
      );

      // exp변경에 따른 level변경 체크
      if (user.exp >= user.level * 100) {
        await User.update(
          {
            level: sequelize.literal("level + 1"),
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      }

      await user_post.create({
        user_id: sess.passport.user,
        post_id: postId,
      });

      res.status(200).send("update success");
    } catch (err) {
      res.status(400).send("bad request");
    }
  },
};
