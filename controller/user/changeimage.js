const multer = require("multer");
const multerS3 = require("multer-s3");
const fs = require("fs"); // 설치 x
const path = require("path"); // 설치 x
const AWS = require("aws-sdk");
const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const sess = req.session;
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "ap-northeast-2",
    });

    let s3 = new AWS.S3();

    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: "userAvartar", // 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
        acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
        key: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
    });
    try {
      const data = await upload.single(req.body);
      console.log(req.body);
      console.log(data);
      await User.update(
        {
          avartar_url: data.file.location,
        },
        {
          where: {
            id: sess.userid,
          },
        }
      );
      //console.log(data);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send("fail to change img");
    }
  },
};
