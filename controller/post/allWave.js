//catgory가 전체일때, 전체가 아닐때로 나눠서 작성
const { Post } = require("../../models");

module.exports = {
  get: (req, res) => {
    const category = req.params.category; // 카테고리
    const sort = req.params.sort; // 인기,최신

    Post.findAll({});
  },
};
