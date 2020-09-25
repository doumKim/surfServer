const { PhasePost } = require("../../models");
module.exports = {
  get: (req, res) => {
    try {
      PhasePost.findOne({
        where: {
          post_id: req.params.postId,
          current_phase: req.query.phase,
        },
      }).then(result => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(400).send("Invalid Access to phasePost data");
    }
  },
};
