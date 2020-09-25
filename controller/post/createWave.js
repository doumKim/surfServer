const { Post } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { text, categories, title, maxPhase, synopsis } = req.body;

    try {
      await Post.Create({
        text: text,
        categories: categories,
        title: title,
        max_Phase: maxPhase,
        synopsis: synopsis,
        create_user: req.session.userId,
      });
      res.status(201).send("Successfully created");
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
