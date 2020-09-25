const phase_post = require("../../models/phase_post");

const { PhasePost } = require("../../models");
module.exports = {
  get: (req, res) => {
    try {
      PhasePost.findAll({
        offset: 0,
        limit: 3,
        order: "created_at desc",
        where: {
          userId: req.session.userId,
        },
      }).then(result => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(401).send("Bad Request");
    }
  },
};
