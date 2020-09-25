const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { email, password, username } = req.body;

    try {
      await User.Create({
        email: email,
        username: username,
        password: password,
      });
      res.status(201).send("Successfully Signed Up");
    } catch (err) {
      res.status(409).send("already exists email or username");
    }
  },
};
