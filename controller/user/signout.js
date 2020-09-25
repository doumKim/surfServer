module.exports = {
  post: (req, res) => {
    const sess = req.session;
    //console.log(sess.userid);
    if (sess.userId) {
      req.session.destroy(err => {
        if (err) {
          res.status(500).end();
        } else if (
          req.url.indexOf("글상세보기") !== -1 ||
          req.url.indexOf("파도 이어가기") !== -1
        ) {
          // res.redirect("/글상세보기");
        } else {
          //res.redirect("/메인페이지");
        }
        res.status(200).send("Successfuly loggedout");
      });
    } else {
      res.status(400).send("You're not logged in");
    }
  },

  /*post: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send("You're not logged in");
      } else if (
        req.url.indexOf("글상세보기") !== -1 ||
        req.url.indexOf("파도 이어가기") !== -1
      ) {
        res.redirect("/글상세보기");
      } else {
        res.redirect("/메인페이지");
      }
    });
  },*/
};
