"use strict";

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert("user_posts", [
      {
        user_id: 1,
        post_id: 3,
        created_at: "2020-10-01 02:37:09",
        updated_at: "2020-10-01 02:37:09",
      },
    ]);
  },
};
