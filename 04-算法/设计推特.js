class Twitter {
  constructor() {
    this.events = {};
    this.post = [];
  }

  postTweet(userId, tweetId) {
    this.post.unshift({ userId, tweetId });
  }

  getNewsFeed(userId) {
    const res = [];
    const followeeIds = [...this.events[userId], userId];
    console.log(followeeIds, "followeeIds", this.post);
    this.post.forEach(({ tweetId, userId }) => {
      if (followeeIds.includes(userId) && res.length <= 9) {
        // @ts-ignore
        res.push(tweetId);
      }
    });
    return res;
  }

  follow(followerId, followeeId) {
    if (this.events[followerId]) {
      this.events[followerId].push(followeeId);
    } else {
      this.events[followerId] = [followeeId];
    }
  }

  unfollow(followerId, followeeId) {
    this.events[followerId] = this.events[followerId].filter(
      (i) => i !== followeeId
    );
  }
}

var obj = new Twitter();
obj.postTweet(1, 1001);
obj.follow(2, 1);
var param_2 = obj.getNewsFeed(2);
console.log(param_2);
//  obj.unfollow(followerId,followeeId)
/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
