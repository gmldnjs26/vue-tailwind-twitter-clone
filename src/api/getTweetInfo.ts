import { USER_COLLECTION, RETWEET_COLLECTION } from '../firebase'

const getTweetInfo = async (tweets, curUser) => {
  await tweets.value.map(async (tweet) => {
    const doc = await USER_COLLECTION.doc(tweet.uid).get()
    const userInfo = {
      profile_image_url: doc.data().profile_image_url,
      email: doc.data().email,
      username: doc.data().username,
    }

    const snapshot = await RETWEET_COLLECTION.where('from_tweet_id', '==', tweet.id)
      .where('uid', '==', curUser.uid)
      .get()
    return { ...tweet, ...userInfo, isRetweeted: snapshot.empty ? false : true }
  })
}
