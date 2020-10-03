const { User, Post } = require("../../models");

module.exports = {
  //가능하면 include 사용하면 기능상으로 좋다.
  post: async (req, res) => {
    const postId = req.params.id;
    try {
      //현재 보고있는 post
      const post = await Post.findOne({
        where: {
          id: postId,
        },
      });
      //현재 페이지를 보고있는 유저
      const user = await User.findOne({
        where: {
          id: req.session.passport.user,
        },
      });
      //post를 쓴 user
      const userPost = await User.findOne({
        where: {
          id: post.create_user,
        },
      });
      //post의 like 1증가
      await user.addLikedWaves(postId);

      await Post.update(
        {
          like: Number(post.like) + 1,
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
          exp: Number(userPost.exp) + 1,
        },
        {
          where: {
            id: post.create_user,
          },
        }
      );

      // exp변경에 따른 level변경 체크
      if (Number(userPost.exp) >= Number(userPost.level) * 100) {
        await User.update(
          {
            level: Number(userPost.level) + 1,
          },
          {
            where: {
              id: userPost.id,
            },
          }
        );
      }

      res.status(200).send("update success");
    } catch (err) {
      console.error(err);
      res.status(400).send("bad request");
    }
  },
};
