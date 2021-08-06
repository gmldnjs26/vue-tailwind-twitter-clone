import { RETWEET_COLLECTION, TWEET_COLLECTION } from '../firebase'
import { store } from '../store'
import firebase from 'firebase'

export default async (tweet) => {
  try {
    if (tweet.isRetweeted) {
      const snapshot = await RETWEET_COLLECTION.where('from_tweet_id', '==', tweet.id)
        .where('uid', '==', store.state.user.uid)
        .get()
      await snapshot.docs[0].ref.delete()
      await TWEET_COLLECTION.doc(tweet.id).update({
        num_retweets: firebase.firestore.FieldValue.increment(-1),
      })
    } else {
      const doc = RETWEET_COLLECTION.doc()
      await doc.set({
        id: doc.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        created_at: Date.now(),
      })

      await TWEET_COLLECTION.doc(tweet.id).update({
        num_retweets: firebase.firestore.FieldValue.increment(1),
      })
    }

    return true
  } catch (e) {
    console.log('Retweet Error', e)
    return false
  }
}
