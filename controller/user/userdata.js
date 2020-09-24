//const { SequelizeScopeError } = require("sequelize/types");
//const { users } = require("../../models");

/*module.exports = {
  get: (req, res) => {
    const sess = req.session;
    if (sess.userid) {
      users
        .findOne({
          where: {
            id: sess.userid,
          },
        })
        .then(result => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(401).send("Invalid Access To User Info");
          }
        });
    }
  },
};
*/
