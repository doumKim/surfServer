const express = require("express");
const router = express.Router();
const { User } = require("../models");
var AWS = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
require("dotenv").config();

const { userController } = require("../controller");

let s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "surfapp.tk/userAvartarImage", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  //limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

router.get("/userinfo", userController.userInfo.get);

router.post("/password", userController.password.post);

router.get("/countposts", userController.countPosts.get);

router.post("/changeimage", upload.single("img"), (req, res) => {
  try {
    let payLoad = { url: req.file.location };
    User.update(
      {
        avartar_url: payLoad,
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
