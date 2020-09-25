const { User } = require("../../models");
module.exports = {
  get: (req, res) => {
    const sess = req.session;
    if (sess.userId) {
      User.findOne({
        where: {
          id: sess.userId,
        },
      }).then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(401).send("Invalid Access To User Info");
        }
      });
    }
  },
};
