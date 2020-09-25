const { Post } = require("../../models");
module.exports = {
  get: (req, res) => {
    try {
      Post.findOne({
        where: {
          id: req.params.postId,
        },
      }).then(result => {
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(400).send("Invalid Access to post data");
    }
  },
};
