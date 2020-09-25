const { Post } = require("../../models");

module.exports = {
  get: (req, res) => {
    try {
      Post.findAll({
        offset: 0,
        limit: 3,
        order: "created_at desc",
        where: {
          id: req.session.userId,
        },
      }).then(result => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(401).send("Invalid Access");
    }
  },
};
