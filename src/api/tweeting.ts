import { TWEET_COLLECTION } from '../firebase'

export default async (tweetContents: string, curUser: any): Promise<void> => {
  const doc = TWEET_COLLECTION.doc()
  await doc.set({
    id: doc.id,
    tweet_contents: tweetContents,
    uid: curUser.uid,
    created_at: Date.now(),
    num_comments: 0,
    num_retweets: 0,
    num_likes: 0,
  })
}
