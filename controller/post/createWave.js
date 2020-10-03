const { Post, PhasePost } = require("../../models");
module.exports = {
  post: async (req, res) => {
    const { categories, title, maxPhase, synopsis, text, sub_title } = req.body;
    try {
      const payLoad = { url: req.file.location };
      const post = await Post.create({
        title_image: payLoad.url,
        categories,
        title,
        max_Phase: maxPhase,
        synopsis,
        current_phase: 1,
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
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  },
};
