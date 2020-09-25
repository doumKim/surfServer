const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { email, password, username } = req.body;

    try {
      const exUser = await User.findOne({ where: { email } });
      if (!exUser) {
        await User.create({
          email: email,
          username: username,
          password: password,
        });
        res.status(201).send("Successfully Signed Up");
      } else {
        res.status(409).send("already exists email or username");
      }
    } catch (err) {
      console.error(err);
    }
  },
};
