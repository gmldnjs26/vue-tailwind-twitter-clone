<template>
  <!-- Main tweets -->
  <div class="flex-1 flex-col border-r border-gray-100 min-w-min overflow-y-auto">
    <!-- page title -->
    <div class="border-b border-gray-100 px-3 py-2 font-bold text-lg">Home</div>
    <!-- tweeting section -->
    <div class="flex px-3 py-3 border-b-2 border-gray-100">
      <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
      <div class="flex flex-col w-full">
        <textarea
          v-model="tweetContents"
          class="w-full text-lg font-bold focus:outline-none ml-3 mb-3 resize-none"
          placeholder="What's happening"
        />
        <div class="text-right">
          <button
            @click="tweeting"
            class="text-white bg-primary rounded-full font-bold w-20 h-10"
            :disabled="tweetContents.length === 0"
            :class="tweetContents.length === 0 ? 'opacity-50' : 'hover:bg-dark'"
          >
            트윗
          </button>
        </div>
      </div>
    </div>
    <!-- tweets section -->
    <div class="mt-3 border-b border-gray-100">
      <Tweet :tweet="tweet" v-for="tweet in tweets" :key="tweet.id" />
    </div>
  </div>
  <!-- trend section -->
  <Trends />
</template>

<script>
import Trends from '../components/Trends.vue'
import Tweet from '../components/Tweet.vue'
import { computed, ref, onBeforeMount } from 'vue'
import { store } from '../store'
import { TWEET_COLLECTION, USER_COLLECTION, RETWEET_COLLECTION } from '../firebase'
import apiTweet from '../api/tweeting'

export default {
  components: {
    Trends,
    Tweet,
  },
  setup() {
    const tweetContents = ref('')
    const curUser = computed(() => store.state.user)
    const tweets = ref([])

    onBeforeMount(() => {
      TWEET_COLLECTION.orderBy('created_at', 'desc').onSnapshot(async (snapshot) => {
        await snapshot.docChanges().forEach(async (change) => {
          let tweet = await change.doc.data()
          if (change.type === 'added') {
            tweets.value.splice(change.newIndex, 0, tweet)
          } else if (change.type === 'modified') {
            tweets.value.splice(change.oldIndex, 1, tweet)
          } else if (change.type === 'removed') {
            tweets.value.splice(change.oldIndex, 1)
          }
        })
        tweets.value = await getTweetInfo()
        console.log(tweets.value)
      })
    })

    const getTweetInfo = async () => {
      return await Promise.all(
        tweets.value.map(async (tweet) => {
          const doc = await USER_COLLECTION.doc(tweet.uid).get()
          const snapshot = await RETWEET_COLLECTION.where('from_tweet_id', '==', tweet.id)
            .where('uid', '==', curUser.value.uid)
            .get()
          const userInfo = {
            profile_image_url: doc.data().profile_image_url,
            email: doc.data().email,
            username: doc.data().username,
          }
          return { ...tweet, ...userInfo, isRetweeted: snapshot.empty ? false : true }
        })
      )
    }

    const tweeting = async () => {
      try {
        await apiTweet(tweetContents.value, curUser.value)
        tweetContents.value = ''
      } catch (e) {
        console.log('tweeting error', e)
      }
    }

    return {
      tweetContents,
      tweeting,
      curUser,
      tweets,
    }
  },
}
</script>

<style></style>
