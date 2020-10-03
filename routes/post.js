const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const { isLoggedin } = require("./middlewares/auth");
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const { postController } = require("../controller");

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "surfapp.tk/surfTitleImage", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension); //userid.postid.파일이름
    },
  }),
  //limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

router.get("/allWave", postController.allWave.get);

router.post("/like/:id", isLoggedin, postController.like.post);

router.post(
  "/createPhaseWave/:id",
  isLoggedin,
  postController.createPhaseWave.post
);

router.post("/createWave", isLoggedin, postController.createWave.post);

router.get("/joinWaveList", isLoggedin, postController.joinWaveList.get);

router.get("/likeWave", isLoggedin, postController.likeWave.get);

router.get("/myWaveList", isLoggedin, postController.myWaveList.get); //1

router.get("/phaseWave/:id", postController.phaseWave.get); //?phase=query

router.get("/wave/:id", postController.wave.get);

router.get(
  "/createCurrentJoinUser/:id",
  isLoggedin,
  postController.createCurrentJoinUser.post
);

router.get(
  "/removeCurrentJoinUser/:id",
  isLoggedin,
  postController.removeCurrentJoinUser.post
);

router.post(
  "/thumbnail",
  isLoggedin,
  upload.single("img"),
  postController.thumbnail.post
);

module.exports = router;
