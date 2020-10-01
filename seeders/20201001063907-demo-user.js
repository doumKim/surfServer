"use strict";

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert("users", [
      {
        username: "kimtaewon",
        email: "kimtaewon@naver.com",
        password: "password",
        avartar_url: "http://www.naver.com",
        created_at: "2020-10-01 02:37:09",
        updated_at: "2020-10-01 02:37:09",
      },
      {
        username: "kimdoum",
        email: "kimdoum@google.com",
        password: "password",
        avartar_url: "http://www.google.com",
        created_at: "2020-10-01 02:47:09",
        updated_at: "2020-10-01 02:47:09",
      },
      {
        username: "kanghankyul",
        email: "kanghankyu@kakao.com",
        password: "password",
        avartar_url: "http://www.kakao.com",
        created_at: "2020-10-01 02:57:09",
        updated_at: "2020-10-01 02:57:09",
      },
      {
        username: "leehyukwon",
        email: "leehyukwon@naver.com",
        password: "password",
        avartar_url: "http://www.naver.com",
        created_at: "2020-10-01 03:37:09",
        updated_at: "2020-10-01 03:37:09",
      },
    ]);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },
};
