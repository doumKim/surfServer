const express = require("express");
const router = express.Router();
const path = require("path");
const { isLoggedin } = require("./middlewares/auth");
const { User } = require("../models");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const { userController } = require("../controller");
const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "surfapp.tk/userAvartarImage", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension); // userid.파일이름
    },
  }),
});
router.get("/userInfo", isLoggedin, userController.userInfo.get);
router.post("/password", isLoggedin, userController.password.post);
router.get("/countPosts", isLoggedin, userController.countPosts.get);
router.post("/changeImage", upload.single("avatar"), (req, res) => {
  try {
    const payLoad = { url: req.file.location };
    User.update(
      {
        avartar_url: payLoad.url,
      },
      {
        where: {
          id: req.session.passport.user,
        },
      }
    ).then(() => {
      res.status(200).send(payLoad);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 에러");
  }
});
module.exports = router;
