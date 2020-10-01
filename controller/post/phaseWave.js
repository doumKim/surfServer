const { PhasePost } = require("../../models");
module.exports = {
  get: (req, res) => {
    try {
      PhasePost.findOne({
        where: {
          post_id: req.params.id, //게시물 id
          current_phase: req.query.phase, //현재회차
        },
      }).then(result => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(400).send("Invalid Access to phasePost data");
    }
  },
};
