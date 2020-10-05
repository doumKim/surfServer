//catgory가 전체일때, 전체가 아닐때로 나눠서 작성
const { Post, User } = require("../../models");
const sequelize = require("sequelize");
const { mapToPostsLikeValue } = require("../helper");
const Op = sequelize.Op;
module.exports = {
  get: async (req, res) => {
    try {
      const category = req.query.category; // 카테고리(전체,액션,로맨스,판타지,스릴러,...)
      const sort = req.query.sort; // 인기,최신 (like, created_at)
      const offset = req.query.offset || 0;
      const passport = req.session.passport;
      if (category) {
        const posts = await Post.findAll({
          offset: Number(offset) || 0,
          limit: 10,
          where: {
            categories: {
              [Op.like]: "%" + category + "%",
            },
          },
          order: [[sort, "DESC"]],
          include: {
            model: User,
            as: "creator_info",
            attributes: ["avartar_url", "username"],
          },
        });
        await mapToPostsLikeValue(posts, passport);
        res.status(200).send(posts);
      } else {
        const posts = await Post.findAll({
          offset: Number(offset) || 0,
          limit: 10,
          order: [[sort, "DESC"]],
          include: [
            {
              model: User,
              as: "creator_info",
              attributes: ["avartar_url", "username"],
            },
          ],
        });
        await mapToPostsLikeValue(posts, passport);
        res.status(200).send(posts);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
