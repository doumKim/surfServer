const { Post, PhasePost } = require("../../models");
module.exports = {
  post: async (req, res) => {
    const { text, sub_title } = req.body;
    const currentPhase = req.query.currentPhase;
    try {
      await PhasePost.create({
        text: text,
        sub_title: sub_title,
        current_phase: Number(currentPhase) + 1,
        post_id: req.params.id,
        user_id: req.session.passport.user,
      });
      await Post.update(
        {
          current_phase: Number(currentPhase) + 1,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).send("Successfuly created");
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  },
};
