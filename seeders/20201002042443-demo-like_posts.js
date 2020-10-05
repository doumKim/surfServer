"use strict";

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert("like_posts", [
      {
        user_id: 1,
        post_id: 3,
      },
      {
        user_id: 2,
        post_id: 3,
      },
    ]);
  },
};
