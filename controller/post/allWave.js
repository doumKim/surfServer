//catgory가 전체일때, 전체가 아닐때로 나눠서 작성
const { Post } = require("../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  get: (req, res) => {
    const category = req.query.category; // 카테고리(전체,액션,로맨스,판타지,스릴러,...)
    const sort = req.query.sort; // 인기,최신 (like, created_at)
    try {
      Post.findAll({
        where: {
          categories: {
            [Op.like]: "%" + category + "%",
          },
        },
        order: [[sort, "DESC"]],
      }).then(result => {
        console.log(result);
        res.status(200).send(result);
      });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
