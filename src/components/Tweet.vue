<template>
  <div class="flex px-3 py-3">
    <img src="https://picsum.photos/100" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col mx-2 space-y-1 w-full">
      <div class="space-x-2">
        <span class="text-sm font-bold">{{ tweet.username }}</span>
        <span class="text-xs font-thin">@{{ tweet.email }}</span>
        <span class="text-xs font-thin">{{ moment(tweet.created_at).fromNow() }}</span>
      </div>
      <div>{{ tweet.tweet_contents }}</div>
      <div class="flex justify-between text-gray-500">
        <div @click="isShowCommentModal = true" class="hover:bg-blue-50 hover:text-primary rounded-full p-2">
          <i class="far fa-comment"></i>
          <span class="ml-1 text-sm">{{ tweet.num_comments }}</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-green-500 rounded-full p-2">
          <i class="far fa-retweet"></i>
          <span class="ml-1 text-sm">{{ tweet.retweets }}</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-red-500 rounded-full p-2">
          <i class="far fa-heart"></i>
          <span class="ml-1 text-sm">{{ tweet.num_likes }}</span>
        </div>
        <div class="hover:bg-blue-50 hover:text-yellow-500 rounded-full p-2">
          <i class="far fa-share-square"></i>
        </div>
      </div>
    </div>
  </div>
  <CommentModal :tweet="tweet" v-if="isShowCommentModal" @toggleCommentModal="toggleCommentModal" />
</template>

<script>
import moment from 'moment'
import { ref } from 'vue'
import CommentModal from '../components/CommentModal.vue'

export default {
  components: {
    CommentModal,
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const isShowCommentModal = ref(false)

    const toggleCommentModal = () => {
      isShowCommentModal.value = !isShowCommentModal.value
    }
    return {
      toggleCommentModal,
      isShowCommentModal,
      moment,
    }
  },
}
</script>

<style></style>
