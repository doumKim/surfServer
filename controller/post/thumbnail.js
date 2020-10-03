const { Post } = require("../../models");

module.exports = {
  post: (req, res) => {
    try {
      const payLoad = { url: req.file.location };
      Post.update(
        {
          title_image: payLoad.url,
        },
        {
          where: {
            create_user: req.session.passport.user,
          },
        }
      ).then(() => {
        res.status(200).send(payLoad);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("internal server error");
    }
  },
};
