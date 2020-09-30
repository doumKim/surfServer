const { PhasePost } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { text, sub_title } = req.body;
    const currentPhase = req.query.currentPhase;
    console.log(req.session);
    try {
      PhasePost.create({
        text: text,
        sub_title: sub_title,
        current_phase: currentPhase + 1,
        post_id: req.params.id,
        user_id: req.session.passport.user,
      }).then(() => {
        res.status(201).send("Successfuly created");
      });
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  },
};
