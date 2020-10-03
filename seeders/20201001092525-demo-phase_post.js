"use strict";

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert("phase_posts", [
      {
        text: "harryharrypotterpotter",
        sub_title: "first",
        current_phase: 1,
        user_id: 3,
        post_id: 1,
        created_at: "2020-10-01 02:37:09",
        updated_at: "2020-10-01 02:37:09",
      },
      {
        text: "texttexttext",
        sub_title: "second",
        current_phase: 1,
        user_id: 3,
        post_id: 2,
        created_at: "2020-10-01 02:47:09",
        updated_at: "2020-10-01 02:47:09",
      },
      {
        text: "3333333333333",
        sub_title: "third",
        current_phase: 1,
        user_id: 2,
        post_id: 3,
        created_at: "2020-10-01 02:57:09",
        updated_at: "2020-10-01 02:57:09",
      },
      {
        text: "두 번째 회차 텍스트 내용입니다.",
        sub_title: "소제목 2",
        current_phase: 1,
        user_id: 1,
        post_id: 3,
        created_at: "2020-10-02 02:57:09",
        updated_at: "2020-10-02 02:57:09",
      },
      {
        text: "세 번째 회차 텍스트 내용입니다.",
        sub_title: "소제목 3",
        current_phase: 1,
        user_id: 3,
        post_id: 3,
        created_at: "2020-10-04 02:57:09",
        updated_at: "2020-10-04 02:57:09",
      },
    ]);
  },
};
