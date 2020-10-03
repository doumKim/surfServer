module.exports = {
  mapToPostLikeValue: async (post, reqUserId) => {
    if (reqUserId) {
      const likers = await post.getLikers();
      let liked = false;
      likers.forEach(liker => {
        if (liker.dataValues.id === reqUserId) liked = true;
      });
      if (liked) {
        post.dataValues.liked = true;
      }
    }
  },
  mapToPostsLikeValue: async (posts, reqUserId) => {
    if (reqUserId) {
      for (let i = 0; i < posts.length; i++) {
        const likers = await posts[i].getLikers();
        posts[i].dataValues.like_count = likers.length;
        for (let j = 0; j < likers.length; j++) {
          if (likers[j].id === reqUserId.user) {
            posts[i].dataValues.liked = true;
          }
        }
      }
    } else {
      for (let i = 0; i < posts.length; i++) {
        const likers = await posts[i].getLikers();
        posts[i].dataValues.like_count = likers.length;
      }
    }
  },
  getLengthOfLikeList: async (users, userId) => {
    const currentUser = await users.findOne({
      where: { id: userId },
    });
    const likeWaveList = await currentUser.getLikedWaves();
    return likeWaveList.length;
  },
};
