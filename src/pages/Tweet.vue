<template>
  <div class="flex-1 flex flex-col border-r-2 border-gray-100 space-y-2">
    <div v-if="tweet">
      <!-- title -->
      <div class="flex items-center my-2 p-2">
        <i
          @click="router.go(-1)"
          class="fas fa-arrow-left text-primary text-lg hover:bg-blue-50 p-1 w-10 h-10 rounded-full text-center"
        ></i>
        <label class="font-bold text-lg ml-2"> 트윗 </label>
      </div>
      <!-- tweet info -->
      <div class="flex p-2 items-center space-x-2">
        <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="flex flex-col text-xs">
          <span class="font-bold">{{ tweet.email }}</span>
          <span class="text-gray-400">{{ tweet.username }}</span>
        </div>
      </div>
      <div class="flex flex-col border-b-2 border-gray-100 p-2 space-y-2">
        <div class="text-sm">
          {{ tweet.tweet_contents }}
        </div>
        <label class="text-sm text-gray-400">{{ moment(tweet.created_at).fromNow() }}</label>
      </div>
      <div class="flex p-2">
        <div class="flex space-x-4 items-center">
          <span class="flex items-center space-x-1">
            <span class="font-bold text-sm">{{ tweet.num_retweets }}</span>
            <label class="text-gray-300 text-xs">리트윗</label>
          </span>
          <span class="flex items-center space-x-1">
            <label class="font-bold text-sm">{{ tweet.num_likes }}</label>
            <label class="text-gray-300 text-xs">마음에 들어요</label>
          </span>
        </div>
      </div>
      <div class="flex justify-around">
        <button class="flex items-center">
          <i class="far fa-comment text-gray-400 text-xl hover:bg-blue-50 hover:text-primary px-1 rounded-full"></i>
        </button>
        <button class="flex items-center">
          <i class="far fa-retweet text-gray-400 text-xl hover:bg-green-50 hover:text-green-400 px-1 rounded-full"></i>
        </button>
        <button>
          <i class="far fa-heart text-gray-400 text-xl hover:bg-red-50 hover:text-red-400 px-1 rounded-full"></i>
        </button>
      </div>
      <!-- comments retweet like etc.. -->
      <div class="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer">
        <img src="http://picsum.photos/100" class="w-10 h-10 rounded-full" />
        <div class="flex-1 flex flex-col text-xs">
          <div class="flex space-x-1">
            <span class="font-bold">imleesky@naver.com</span>
            <span class="font-bold">@gmldnjs26</span>
            <span class="text-gray-400">19 days ago</span>
          </div>
          <div class="text-sm">comment</div>
        </div>
        <button>
          <i class="fas fa-trash text-red-400 hover:bg-red-50 w-10 h-10 rounded-full p-3"></i>
        </button>
      </div>
    </div>
  </div>
  <Trends />
</template>

<script>
import moment from 'moment'
import Trends from '../components/Trends.vue'
import router from '../router'
import { onBeforeMount, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import { TWEET_COLLECTION } from '../firebase'
import getTweetInfo from '../api/getTweetInfo'

export default {
  components: { Trends },
  setup() {
    const tweet = ref(null)
    const comments = ref([])
    const curUser = computed(() => {
      return store.state.user
    })
    const route = useRoute()

    onBeforeMount(async () => {
      await TWEET_COLLECTION.doc(route.params.id).onSnapshot(async (doc) => {
        const t = await getTweetInfo(doc.data(), curUser.value)
        tweet.value = t
      })
    })

    return {
      router,
      tweet,
      comments,
      curUser,
      moment,
    }
  },
}
</script>

<style></style>
