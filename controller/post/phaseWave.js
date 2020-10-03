const { PhasePost } = require("../../models");
module.exports = {
  get: async (req, res) => {
    try {
      const phasePosts = await PhasePost.findOne({
        where: { post_id: req.params.id, current_phase: req.query.phase },
      });
      res.status(200).send(phasePosts);
    } catch (err) {
      console.error(err);
      res.status(400).send("Invalid Access to phasePost data");
    }
  },
};
