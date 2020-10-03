module.exports = {
  mapToPostLikeValue: async (post, reqUserId) => {
    if (reqUserId) {
      const likers = await post.getUsers();
      let liked = false;
      likers.forEach(liker => {
        if (liker.dataValues.id === reqUserId) liked = true;
      });
      if (liked) {
        post.dataValues.liked = true;
      }
    }
  },
  // mapToPostsLikeValue: async (psots) => {}
};
