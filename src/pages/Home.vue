<template>
  <div>
    <!-- Main tweets -->
    <div class="flex-1 flex-col border-r border-gray-100 overflow-y-auto">
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
        <Tweet v-for="t in 7" :key="t" />
      </div>
    </div>
  </div>
  <!-- trend section -->
  <Trends />
</template>

<script>
import Trends from '../components/Trends.vue'
import Tweet from '../components/Tweet.vue'
import { computed, ref } from 'vue'
import { store } from '../store'
import { TWEET_COLLECTION } from '../firebase'

export default {
  components: {
    Trends,
    Tweet,
  },
  setup() {
    const tweetContents = ref('')
    const curUser = computed(() => store.state.user)

    const tweeting = async () => {
      try {
        const doc = TWEET_COLLECTION.doc()
        await doc.set({
          id: doc.id,
          tweet_contents: tweetContents.value,
          uid: curUser.value.uid,
          created_at: Date.now(),
          num_comments: 0,
          num_retweets: 0,
          num_likes: 0,
        })
        tweetContents.value = ''
      } catch (e) {
        console.log('tweeting error', e)
      }
    }

    return {
      tweetContents,
      tweeting,
      curUser,
    }
  },
}
</script>

<style></style>
