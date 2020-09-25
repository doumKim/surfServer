module.exports = (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(302).send("Logged out successfully").redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send("You're not logged in.");
  }
};
