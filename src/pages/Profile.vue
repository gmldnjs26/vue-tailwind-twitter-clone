<template>
  <div class="flex-1 flex">
    <!-- profile section -->
    <div class="flex-1 flex flex-col border-r border-gray-100">
      <!-- title -->
      <div class="px-3 py-1 flex border-b border-gray-100">
        <button class="mr-4">
          <i class="fas fa-arrow-left text-primary p-3 rounded-full hover:bg-blue-50"></i>
        </button>
        <div>
          <div class="font-extrabold text-lg">{{ curUser.username }}</div>
          <div class="text-xs text-gray">{{ curUser.num_tweets }} 트윗</div>
        </div>
      </div>
      <!-- background image -->
      <div class="bg-gray-300 h-40 relative flex-none">
        <!-- profile image -->
        <div class="border-4 border-white bg-gray-100 w-28 h-28 rounded-full absolute -bottom-14 left-2">
          <img src="http://picsum.photos/200" class="rounded-full opacity-90 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
      <!-- profile edit button -->
      <div class="text-right mt-2 mr-2">
        <button class="border text-sm border-primary text-primary px-3 py-2 hover:bg-blue-50 font-bold rounded-full">
          프로필 수정
        </button>
      </div>
      <!-- user info -->
      <div class="mx-3 mt-2">
        <div class="font-extrabold text-lg">{{ curUser.email }}</div>
        <div class="text-gray">@{{ curUser.username }}</div>
        <div>
          <span class="text-gray">{{ moment(curUser.created_at).format('YYYY년 MM월') }}</span>
        </div>
        <div>
          <span class="font-bold mr-1">{{ curUser.followings.length }}</span>
          <span class="text-gray mr-3">팔로우 중</span>
          <span class="font-bold mr-1">{{ curUser.followers.length }}</span>
          <span class="text-gray">팔로워</span>
        </div>
      </div>
      <!-- tabs -->
      <div class="flex border-b border-gray-100 mt-3">
        <div
          @click="currentTap = 'tweet'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'tweet' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          트윗
        </div>
        <div
          @click="currentTap = 'retweet'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'retweet' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          리트윗
        </div>
        <div
          @click="currentTap = 'like'"
          class="py-3 font-bold text-center w-1/3 hover:bg-blue-50 cursor-pointer hover:text-primary"
          :class="currentTap === 'like' ? 'text-primary border-b-2 border-primary' : 'text-gray'"
        >
          좋아요
        </div>
      </div>
      <Tweet
        v-for="tweet in currentTap === 'tweet' ? tweets : currentTap === 'retweet' ? reTweets : likeTweets"
        :key="tweet.id"
        :tweet="tweet"
      />
    </div>
    <!-- trend section -->
    <Trends />
  </div>
</template>

<script>
import Trends from '../components/Trends.vue'
import Tweet from '../components/Tweet.vue'
import { store } from '../store'
import { computed, ref, onBeforeMount } from 'vue'
import { TWEET_COLLECTION, USER_COLLECTION, RETWEET_COLLECTION, LIKE_COLLECTION } from '../firebase'
import moment from 'moment'
import getTweetInfo from '../api/getTweetInfo'

export default {
  components: {
    Trends,
    Tweet,
  },
  setup() {
    const curUser = computed(() => store.state.user)
    const tweets = ref([])
    const reTweets = ref([])
    const likeTweets = ref([])

    const currentTap = ref('tweet')

    onBeforeMount(() => {
      USER_COLLECTION.doc(curUser.value.uid).onSnapshot((doc) => {
        store.commit('SET_USER', doc.data())
      })

      TWEET_COLLECTION.where('uid', '==', curUser.value.uid)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            let tweet = await getTweetInfo(change.doc.data(), curUser.value)
            if (change.type === 'added') {
              tweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              tweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              tweets.value.splice(change.oldIndex, 1)
            }
          })
        })
      RETWEET_COLLECTION.where('uid', '==', curUser.value.uid)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            const doc = await TWEET_COLLECTION.doc(change.doc.data().from_tweet_id).get()
            let tweet = await getTweetInfo(doc.data(), curUser.value)
            if (change.type === 'added') {
              reTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              reTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              reTweets.value.splice(change.oldIndex, 1)
            }
          })
        })

      LIKE_COLLECTION.where('uid', '==', curUser.value.uid)
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          await snapshot.docChanges().forEach(async (change) => {
            const doc = await TWEET_COLLECTION.doc(change.doc.data().from_tweet_id).get()
            let tweet = await getTweetInfo(doc.data(), curUser.value)
            if (change.type === 'added') {
              likeTweets.value.splice(change.newIndex, 0, tweet)
            } else if (change.type === 'modified') {
              likeTweets.value.splice(change.oldIndex, 1, tweet)
            } else if (change.type === 'removed') {
              likeTweets.value.splice(change.oldIndex, 1)
            }
          })
        })
    })
    return {
      curUser,
      tweets,
      moment,
      reTweets,
      likeTweets,
      currentTap,
    }
  },
}
</script>

<style></style>
