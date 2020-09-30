const { Post, PhasePost } = require("../../models");
module.exports = {
  post: async (req, res) => {
    console.log(req.session);
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
      let post = await Post.create({
        title_image: title_image,
        categories: categories,
        title: title,
        max_Phase: maxPhase,
        synopsis: synopsis,
        create_user: req.session.passport.user,
      });

      console.log(post);

      await PhasePost.create({
        text: text,
        sub_title: sub_title,
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
