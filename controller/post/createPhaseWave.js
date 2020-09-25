const { PhasePost } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { text, sub_title, current_phase } = req.body;
    try {
      PhasePost.create({
        text: text,
        sub_title: sub_title,
        current_phase: current_phase,
        post_id: req.paramas.id,
        user_id: req.session.userId,
      }).then(result => {
        res.status(201).send("Successfuly created");
      });
    } catch (err) {
      res.status(400).send("Bad Request");
    }
  },
};
