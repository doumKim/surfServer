const { Post, PhasePost } = require("../../models");
module.exports = {
  get: async (req, res) => {
    try {
      const phasePosts = await Post.findOne({
        where: { id: req.params.id },
        include: {
          model: PhasePost,
          as: "phase_waves",
        },
      });
      res.status(200).send(phasePosts);
    } catch (err) {
      console.error(err);
      res.status(400).send("Invalid Access to phasePost data");
    }
  },
};
