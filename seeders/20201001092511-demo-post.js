"use strict";

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert("posts", [
      {
        title: "harryPotter",
        synopsis: "magiiiiiiiiiiic",
        title_image: "urlrulrulrulrul",
        current_phase: 1,
        like: 0,
        max__phase: 5,
        categories: "action",
        create_user: 3,
        created_at: "2020-10-01 02:37:09",
        updated_at: "2020-10-01 02:37:09",
        //is_writable: true,
      },
      {
        title: "david",
        synopsis: "daviddavid",
        title_image: "urlrulrulrulrul2",
        current_phase: 1,
        like: 0,
        max__phase: 5,
        categories: "action, romance",
        create_user: 3,
        created_at: "2020-10-01 02:47:09",
        updated_at: "2020-10-01 02:47:09",
        //is_writable: true,
      },
      {
        title: "god",
        synopsis: "neverever",
        title_image: "urlrulrulrul",
        current_phase: 1,
        like: 1,
        max__phase: 5,
        categories: "action",
        create_user: 2,
        created_at: "2020-10-01 02:57:09",
        updated_at: "2020-10-01 02:57:09",
        //is_writable: true,
      },
    ]);
  },
};
