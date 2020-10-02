const { Post, PhasePost } = require("../../models");
module.exports = {
  post: async (req, res) => {
    const {
      categories,
      title,
      maxPhase,
      synopsis,
      title_image,
      text,
      sub_title,
    } = req.body;

    try {
      const post = await Post.create({
        title_image,
        categories,
        title,
        max_Phase: maxPhase,
        synopsis,
        create_user: req.session.passport.user,
      });

      await PhasePost.create({
        text,
        sub_title,
        current_phase: 1,
        post_id: post.id,
        user_id: req.session.passport.user,
      });

      res.status(201).send("Successfully created");
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
